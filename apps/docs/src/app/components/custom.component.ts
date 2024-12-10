import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-custom',
  template: `
    <div>A custom toast with default styling</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomComponent {}
