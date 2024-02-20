import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { SonnerService } from 'ngx-sonner';
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
  private readonly sonner = inject(SonnerService);

  closeButton = input.required<boolean>();
  @Output() closeButtonChange = new EventEmitter<boolean>();

  richColors = input.required<boolean>();
  @Output() richColorsChange = new EventEmitter<boolean>();

  allTypes = [
    {
      name: 'Rich Colors Success',
      snippet: "this.sonner.success('Event has been created')",
      action: () => {
        this.sonner.success('Event has been created');
        this.richColorsChange.emit(true);
      },
    },
    {
      name: 'Rich Colors Error',
      snippet: "this.sonner.error('Event has not been created')",
      action: () => {
        this.sonner.error('Event has not been created');
        this.richColorsChange.emit(true);
      },
    },
    {
      name: 'Rich Colors Info',
      snippet: "this.sonner.info('Info')",
      action: () => {
        this.sonner.info('Be at the area 10 minutes before the event time');
        this.richColorsChange.emit(true);
      },
    },
    {
      name: 'Rich Colors Warning',
      snippet: "this.sonner.warning('Warning')",
      action: () => {
        this.sonner.warning('Event start time cannot be earlier than 8am');
        this.richColorsChange.emit(true);
      },
    },
    {
      name: 'Close buttons',
      snippet: `this.sonner.message('Event has been created', {
    description: 'Monday, January 3rd at 6:00pm',
  })`,
      action: () => {
        this.sonner.message('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        });
        this.closeButtonChange.emit(!this.closeButton());
      },
    },
    {
      name: 'Headless',
      snippet: `this.sonner.custom(HeadlessToast)

// With props:
this.sonner.custom(HeadlessToastComponent, {
  componentProps: {
    eventName: 'Louvre Museum'
  }
})
  `,
      action: () => {
        this.sonner.custom(TestComponent, {
          componentProps: { eventName: 'Louvre Museum' },
        });
      },
    },
    {
      name: 'Custom with properties',
      snippet: `this.sonner.warning(TestWithInputsComponent, {
  componentProps: {
    message: 'This is <br />multiline message',
  }
})`,
      action: () => {
        this.sonner.warning(TestWithInputsComponent, {
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
private readonly sonner = inject(SonnerService);
${this.activeType().snippet ?? ''}`
  );
}
