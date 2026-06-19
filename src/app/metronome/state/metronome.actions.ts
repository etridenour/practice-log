import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MetronomeActions = createActionGroup({
  source: 'Metronome',
  events: {
    'Start': emptyProps(),
    'Stop': emptyProps(),
    'Set BPM': props<{ bpm: number }>(),
    'Set Beats Per Measure': props<{ beats: number }>(),
    'Tick': props<{ beat: number; isAccent: boolean }>(),
  },
});
