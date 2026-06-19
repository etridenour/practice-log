import { createReducer, createFeature, on } from '@ngrx/store';
import { MetronomeActions } from './metronome.actions';

export interface MetronomeState {
  bpm: number;
  beatsPerMeasure: number;
  currentBeat: number;
  isPlaying: boolean;
}

const initialState: MetronomeState = {
  bpm: 120,
  beatsPerMeasure: 4,
  currentBeat: 0,
  isPlaying: false,
};

export const metronomeFeature = createFeature({
  name: 'metronome',
  reducer: createReducer(
    initialState,
    on(MetronomeActions.start, (state) => ({ ...state, isPlaying: true })),
    on(MetronomeActions.stop, (state) => ({ ...state, isPlaying: false, currentBeat: 0 })),
    on(MetronomeActions.setBPM, (state, { bpm }) => ({ ...state, bpm })),
    on(MetronomeActions.setBeatsPerMeasure, (state, { beats }) => ({ ...state, beatsPerMeasure: beats })),
    on(MetronomeActions.tick, (state, { beat }) => ({ ...state, currentBeat: beat })),
  ),
});
