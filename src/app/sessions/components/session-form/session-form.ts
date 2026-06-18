import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SessionActions } from '../../state/session.actions';

@Component({
  selector: 'app-session-form',
  imports: [ReactiveFormsModule],
  templateUrl: './session-form.html',
  styleUrl: './session-form.css',
})
export class SessionForm {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form: FormGroup = this.fb.group({
    instrument: ['', Validators.required],
    duration: [null as number | null, [Validators.required, Validators.min(1)]],
    tempo: [''],
    notes: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    const { instrument, duration, tempo, notes } = this.form.value;

    this.store.dispatch(
      SessionActions.createSession({
        input: {
          instrument,
          duration,
          tempo: tempo ? tempo.split(',').map((t: string) => parseInt(t.trim(), 10)) : undefined,
          notes: notes || undefined,
        },
      }),
    );

    this.form.reset();
  }
}
