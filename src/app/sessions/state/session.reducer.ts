import { createReducer, createFeature, on } from '@ngrx/store';
import { Session } from '../models/session.model';
import { SessionActions } from './session.actions';

export interface SessionState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessions: [],
  loading: false,
  error: null,
};

export const sessionFeature = createFeature({
  name: 'sessions',
  reducer: createReducer(
    initialState,

    // Load
    on(SessionActions.loadSessions, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(SessionActions.loadSessionsSuccess, (state, { sessions }) => ({
      ...state,
      sessions,
      loading: false,
    })),
    on(SessionActions.loadSessionsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    // Create
    on(SessionActions.createSession, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(SessionActions.createSessionSuccess, (state, { session }) => ({
      ...state,
      sessions: [session, ...state.sessions],
      loading: false,
    })),
    on(SessionActions.createSessionFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    // Delete
    on(SessionActions.deleteSessionSuccess, (state, { id }) => ({
      ...state,
      sessions: state.sessions.filter((s) => s.id !== id),
    })),
    on(SessionActions.deleteSessionFailure, (state, { error }) => ({
      ...state,
      error,
    })),
  ),
});
