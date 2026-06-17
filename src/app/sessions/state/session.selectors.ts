import { createSelector } from '@ngrx/store';
import { sessionFeature } from './session.reducer';

// Base selectors — generated automatically by createFeature
export const {
  selectSessions,
  selectLoading,
  selectError,
} = sessionFeature;

// Derived selectors — computed from base selectors
export const selectTotalSessions = createSelector(
  selectSessions,
  (sessions) => sessions.length,
);

export const selectTotalPracticeMinutes = createSelector(
  selectSessions,
  (sessions) => sessions.reduce((total, s) => total + s.duration, 0),
);

export const selectRecentSessions = createSelector(
  selectSessions,
  (sessions) => sessions.slice(0, 5),
);
