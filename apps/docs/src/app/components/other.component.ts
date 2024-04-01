import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  signal,
} from '@angular/core';
import { toast } from 'ngx-sonner';
import { CodeBlockComponent } from './code-block.component';
import { TestWithInputsComponent } from './test-with-inputs.component';
import { TestComponent } from './test.component';

@Component({
  selector: 'docs-other',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div>
      <h2>Other</h2>
      <div class="buttons">
        @for (type of allTypes; track $index) {
          <button
            class="button"
            [attr.data-testid]="'other-' + type.name"
            [attr.data-active]="activeType().name === type.name"
            (click)="type.action(); activeType.set(type)">
            {{ type.name }}
            @if (type.name === 'Close buttons') {
              ({{ closeButton() ? 'Visible' : 'Hidden' }})
            }
          </button>
        }
      </div>
      <docs-code-block [code]="codeSnipped()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherComponent {
  closeButton = model.required<boolean>();
  richColors = model.required<boolean>();

  allTypes = [
    {
      name: 'Rich Colors Success',
      snippet: "toast.success('Event has been created')",
      action: () => {
        toast.success('Event has been created');
        this.richColors.set(true);
      },
    },
    {
      name: 'Rich Colors Error',
      snippet: "toast.error('Event has not been created')",
      action: () => {
        toast.error('Event has not been created');
        this.richColors.set(true);
      },
    },
    {
      name: 'Rich Colors Info',
      snippet: "toast.info('Info')",
      action: () => {
        toast.info('Be at the area 10 minutes before the event time');
        this.richColors.set(true);
      },
    },
    {
      name: 'Rich Colors Warning',
      snippet: "toast.warning('Warning')",
      action: () => {
        toast.warning('Event start time cannot be earlier than 8am');
        this.richColors.set(true);
      },
    },
    {
      name: 'Close buttons',
      snippet: `toast('Event has been created', {
    description: 'Monday, January 3rd at 6:00pm',
  })`,
      action: () => {
        toast('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        });
        this.closeButton.set(!this.closeButton());
      },
    },
    {
      name: 'Headless',
      snippet: `toast.custom(HeadlessToast)

// With props:
toast.custom(HeadlessToastComponent, {
  componentProps: {
    eventName: 'Louvre Museum'
  }
})
  `,
      action: () => {
        toast.custom(TestComponent, {
          componentProps: { eventName: 'Louvre Museum' },
        });
      },
    },
    {
      name: 'Custom with properties',
      snippet: `toast.warning(TestWithInputsComponent, {
  componentProps: {
    message: 'This is <br />multiline message',
  }
})`,
      action: () => {
        toast.warning(TestWithInputsComponent, {
          componentProps: {
            message: 'This is <br />multiline message',
          },
        });
      },
    },
  ];

  activeType = signal(this.allTypes[0]);
  codeSnipped = computed(
    () =>
      `//html
<ngx-sonner-toaster ${this.richColors() ? 'richColors' : ''} ${this.closeButton() ? 'closeButton' : ''} />

// ts
${this.activeType().snippet ?? ''}`
  );
}
