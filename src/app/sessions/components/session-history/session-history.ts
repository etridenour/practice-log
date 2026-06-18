import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import { SessionActions } from '../../state/session.actions';
import {
  selectSessions,
  selectLoading,
  selectError,
  selectTotalPracticeMinutes,
} from '../../state/session.selectors';

@Component({
  selector: 'app-session-history',
  imports: [DatePipe],
  templateUrl: './session-history.html',
  styleUrl: './session-history.css',
})
export class SessionHistory implements OnInit {
  private store = inject(Store);

  sessions = this.store.selectSignal(selectSessions);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);
  totalMinutes = this.store.selectSignal(selectTotalPracticeMinutes);

  ngOnInit(): void {
    this.store.dispatch(SessionActions.loadSessions());
  }

  deleteSession(id: string): void {
    this.store.dispatch(SessionActions.deleteSession({ id }));
  }
}
