import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { SessionActions } from './session.actions';
import { SessionService } from '../services/session.service';

@Injectable()
export class SessionEffects {
  private actions$ = inject(Actions);
  private sessionService = inject(SessionService);

  loadSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loadSessions),
      exhaustMap(() =>
        this.sessionService.getSessions().pipe(
          map((sessions) => SessionActions.loadSessionsSuccess({ sessions })),
          catchError((error) => of(SessionActions.loadSessionsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  createSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.createSession),
      exhaustMap(({ input }) =>
        this.sessionService.createSession(input).pipe(
          map((session) => SessionActions.createSessionSuccess({ session })),
          catchError((error) => of(SessionActions.createSessionFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.deleteSession),
      exhaustMap(({ id }) =>
        this.sessionService.deleteSession(id).pipe(
          map(() => SessionActions.deleteSessionSuccess({ id })),
          catchError((error) => of(SessionActions.deleteSessionFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
