import { Component } from '@angular/core';
import { SessionForm } from './components/session-form/session-form';
import { SessionHistory } from './components/session-history/session-history';

@Component({
  selector: 'app-sessions-page',
  imports: [SessionForm, SessionHistory],
  template: `
    <div class="sessions-page">
      <app-session-form />
      <app-session-history />
    </div>
  `,
  styles: `
    .sessions-page {
      display: flex;
      gap: 48px;
      padding: 24px;
    }
  `,
})
export class SessionsPage {}
