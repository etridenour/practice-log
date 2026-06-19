import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { sessionFeature } from './sessions/state/session.reducer';
import { SessionEffects } from './sessions/state/session.effects';
import { metronomeFeature } from './metronome/state/metronome.reducer';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions',
    pathMatch: 'full',
  },
  {
    path: 'sessions',
    providers: [
      provideState(sessionFeature),
      provideEffects(SessionEffects),
    ],
    loadComponent: () =>
      import('./sessions/sessions-page').then((m) => m.SessionsPage),
  },
  {
    path: 'metronome',
    providers: [
      provideState(metronomeFeature),
    ],
    loadComponent: () =>
      import('./metronome/metronome-page').then((m) => m.MetronomePage),
  },
];
