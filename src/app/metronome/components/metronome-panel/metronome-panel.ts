import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MetronomeActions } from '../../state/metronome.actions';
import { selectBpm, selectBeatsPerMeasure, selectCurrentBeat, selectIsPlaying } from '../../state/metronome.selectors';
import { MetronomeService } from '../../services/metronome.service';

@Component({
  selector: 'app-metronome-panel',
  imports: [],
  templateUrl: './metronome-panel.html',
  styleUrl: './metronome-panel.css',
})
export class MetronomePanel implements OnInit, OnDestroy {
  private store = inject(Store);
  private metronomeService = inject(MetronomeService);
  private tickSub: Subscription | null = null;

  bpm = this.store.selectSignal(selectBpm);
  beatsPerMeasure = this.store.selectSignal(selectBeatsPerMeasure);
  currentBeat = this.store.selectSignal(selectCurrentBeat);
  isPlaying = this.store.selectSignal(selectIsPlaying);

  ngOnInit(): void {
    // Subscribe to ticks — play audio and update store
    this.tickSub = this.metronomeService.tick$.subscribe((tick) => {
      if (this.isPlaying()) {
        this.metronomeService.playClick(tick.isAccent);
        this.store.dispatch(MetronomeActions.tick(tick));
      }
    });
  }

  ngOnDestroy(): void {
    this.tickSub?.unsubscribe();
    this.metronomeService.stop();
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.metronomeService.stop();
      this.store.dispatch(MetronomeActions.stop());
    } else {
      this.store.dispatch(MetronomeActions.start());
      // tick$ will start emitting because repeat() re-subscribes
    }
  }

  onBpmChange(event: Event): void {
    const bpm = parseInt((event.target as HTMLInputElement).value, 10);
    if (bpm > 0) {
      this.store.dispatch(MetronomeActions.setBPM({ bpm }));
      this.metronomeService.setBpm(bpm);
    }
  }

  onBeatsChange(event: Event): void {
    const beats = parseInt((event.target as HTMLInputElement).value, 10);
    if (beats > 0) {
      this.store.dispatch(MetronomeActions.setBeatsPerMeasure({ beats }));
      this.metronomeService.setBeatsPerMeasure(beats);
    }
  }
}
