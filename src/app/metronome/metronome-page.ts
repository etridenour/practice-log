import { Component } from '@angular/core';
import { MetronomePanel } from './components/metronome-panel/metronome-panel';

@Component({
  selector: 'app-metronome-page',
  imports: [MetronomePanel],
  template: `
    <div class="metronome-page">
      <app-metronome-panel />
    </div>
  `,
  styles: `
    .metronome-page {
      display: flex;
      justify-content: center;
      padding: 24px;
    }
  `,
})
export class MetronomePage {}
