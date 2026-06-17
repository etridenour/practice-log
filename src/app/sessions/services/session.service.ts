import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

import { Session, CreateSessionInput } from '../models/session.model';
import { GET_SESSIONS, CREATE_SESSION, DELETE_SESSION } from '../graphql/session.graphql';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private apollo = inject(Apollo);

  getSessions(): Observable<Session[]> {
    return this.apollo
      .query<{ sessions: Session[] }>({
        query: GET_SESSIONS,
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data!.sessions));
  }

  createSession(input: CreateSessionInput): Observable<Session> {
    return this.apollo
      .mutate<{ createSession: Session }>({
        mutation: CREATE_SESSION,
        variables: { input },
      })
      .pipe(map((result) => result.data!.createSession));
  }

  deleteSession(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteSession: boolean }>({
        mutation: DELETE_SESSION,
        variables: { id },
      })
      .pipe(map((result) => result.data!.deleteSession));
  }
}
