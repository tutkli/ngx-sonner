import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlockComponent } from './code-block.component';
import { usageSnippet } from './code-snippets';

@Component({
  selector: 'docs-usage',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div>
      <h2>Usage</h2>
      <p>Render the toaster in the root of your app.</p>
      <docs-code-block [code]="usageSnippet" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageComponent {
  protected readonly usageSnippet = usageSnippet;
}
