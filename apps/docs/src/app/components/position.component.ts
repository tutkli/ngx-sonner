import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { toast } from 'ngx-sonner';
import { CodeBlockComponent } from './code-block.component';

@Component({
  selector: 'docs-position',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div>
      <h2>Position</h2>
      <p>Swipe direction changes depending on the position.</p>
      <div class="buttons">
        @for (pos of positions; track pos) {
          <button
            [attr.data-active]="position() === pos"
            class="button"
            (click)="showToast(pos)">
            {{ pos }}
          </button>
        }
      </div>
      <docs-code-block [code]="positionSnippet()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionComponent {
  positions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ] as const;

  position = input.required<(typeof this.positions)[number]>();

  @Output() positionChange = new EventEmitter<
    (typeof this.positions)[number]
  >();

  positionSnippet = computed(
    () => `<ngx-sonner-toaster position="${this.position()}" />`
  );

  showToast(position: (typeof this.positions)[number]) {
    const toastsAmount = document.querySelectorAll(
      '[data-sonner-toast]'
    ).length;
    this.positionChange.emit(position);

    // No need to show a toast when there is already one
    if (toastsAmount > 0 && position !== this.position()) return;

    toast('Event has been created', {
      description: 'Monday, January 3rd at 6:00pm',
    });
  }
}
