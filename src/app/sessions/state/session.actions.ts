import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Session, CreateSessionInput } from '../models/session.model';

export const SessionActions = createActionGroup({
  source: 'Sessions',
  events: {
    // Load sessions
    'Load Sessions': emptyProps(),
    'Load Sessions Success': props<{ sessions: Session[] }>(),
    'Load Sessions Failure': props<{ error: string }>(),

    // Create session
    'Create Session': props<{ input: CreateSessionInput }>(),
    'Create Session Success': props<{ session: Session }>(),
    'Create Session Failure': props<{ error: string }>(),

    // Delete session
    'Delete Session': props<{ id: string }>(),
    'Delete Session Success': props<{ id: string }>(),
    'Delete Session Failure': props<{ error: string }>(),
  },
});
