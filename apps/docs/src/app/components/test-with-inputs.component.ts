import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'docs-test-with-inputs',
  template: `
    <div [innerHTML]="message()"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestWithInputsComponent {
  message = input.required<string>();
}
