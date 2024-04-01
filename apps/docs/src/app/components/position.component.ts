import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
} from '@angular/core';
import { toast } from 'ngx-sonner';
import { CodeBlockComponent } from './code-block.component';

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

type Position = (typeof positions)[number];

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
  protected positions = positions;

  position = model.required<Position>();

  positionSnippet = computed(
    () => `<ngx-sonner-toaster position="${this.position()}" />`
  );

  showToast(position: Position) {
    const toastsAmount = document.querySelectorAll(
      '[data-sonner-toast]'
    ).length;

    // No need to show a toast when there is already one
    if (toastsAmount === 0 || position === this.position()) {
      toast('Event has been created', {
        description: 'Monday, January 3rd at 6:00pm',
      });
    }

    this.position.set(position);
  }
}
