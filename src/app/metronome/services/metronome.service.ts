import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, takeUntil, scan, map, timer, repeat } from 'rxjs';

export interface MetronomeTick {
  beat: number;        // current beat (1-based)
  isAccent: boolean;   // true on beat 1 of each measure
}

@Injectable({ providedIn: 'root' })
export class MetronomeService {
  private audioContext: AudioContext | null = null;

  private bpm$ = new BehaviorSubject<number>(120);
  private beatsPerMeasure$ = new BehaviorSubject<number>(4);
  private stop$ = new Subject<void>();

  // The core RxJS pipeline:
  // When BPM changes, switchMap cancels the old interval and starts a new one.
  // scan tracks which beat we're on, cycling 1 → 2 → 3 → 4 → 1 → ...
  readonly tick$ = this.bpm$.pipe(
    switchMap((bpm) => {
      const intervalMs = 60_000 / bpm;

      // timer(0, interval) emits immediately, then every intervalMs
      return timer(0, intervalMs).pipe(
        // Combine with beatsPerMeasure to know when to cycle
        switchMap((tickIndex) =>
          this.beatsPerMeasure$.pipe(
            map((beatsPerMeasure) => ({
              tickIndex,
              beatsPerMeasure,
            })),
          ),
        ),
      );
    }),
    scan(
      (acc, { tickIndex, beatsPerMeasure }) => {
        // On first tick or when tickIndex resets, start at beat 1
        if (tickIndex === 0) {
          return { beat: 1, isAccent: true };
        }
        const nextBeat = (acc.beat % beatsPerMeasure) + 1;
        return { beat: nextBeat, isAccent: nextBeat === 1 };
      },
      { beat: 0, isAccent: false } as MetronomeTick,
    ),
    takeUntil(this.stop$),
    repeat(), // re-subscribe after stop$ so it can be started again
  );

  setBpm(bpm: number): void {
    this.bpm$.next(bpm);
  }

  setBeatsPerMeasure(beats: number): void {
    this.beatsPerMeasure$.next(beats);
  }

  stop(): void {
    this.stop$.next();
  }

  // Web Audio API: play a short click sound
  playClick(isAccent: boolean): void {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Accent beats are higher pitched
    oscillator.frequency.value = isAccent ? 1000 : 800;
    oscillator.type = 'square';

    // Short click: ramp volume down quickly
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.05,
    );

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }
}
