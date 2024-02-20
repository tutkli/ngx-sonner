import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-custom',
  standalone: true,
  template: `
    <div style="border: solid 1px black; border-radius: 5px; padding: 4px;">
      <h1>{{ label() }}</h1>
      <h2>{{ description() }}</h2>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomComponent {
  label = input.required<string>();
  description = input.required<string>();
}
