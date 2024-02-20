import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
} from '@angular/core';
import { SonnerService } from 'ngx-sonner';
import { CodeBlockComponent } from './code-block.component';

@Component({
  selector: 'docs-expand',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div>
      <h2>Expand</h2>
      <p>
        You can change the amount of toasts visible through the
        <code>visibleToasts</code>
        input.
      </p>
      <div class="buttons">
        <button
          [attr.data-active]="expand()"
          class="button"
          (click)="expandToasts()">
          Expand
        </button>
        <button
          [attr.data-active]="!expand()"
          class="button"
          (click)="collapseToasts()">
          Default
        </button>
      </div>
      <docs-code-block [code]="expandSnippet()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandComponent {
  private readonly sonner = inject(SonnerService);

  expand = input.required<boolean>();
  @Output() expandChange = new EventEmitter<boolean>();

  expandSnippet = computed(
    () => `<ngx-sonner-toaster [expand]="${this.expand()}" />`
  );

  expandToasts() {
    this.sonner.message('Event has been created', {
      description: 'Monday, January 3rd at 6:00pm',
    });
    this.expandChange.emit(true);
  }

  collapseToasts() {
    this.sonner.message('Event has been created', {
      description: 'Monday, January 3rd at 6:00pm',
    });
    this.expandChange.emit(false);
  }
}
