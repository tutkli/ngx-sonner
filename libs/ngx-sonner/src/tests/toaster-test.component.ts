import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgxSonnerToaster, ToasterProps, toast } from 'ngx-sonner';

type ToastFn = (t: typeof toast) => void;

export type ToastTestInputs = {
  callback: ToastFn;
  dir?: ToasterProps['dir'];
  theme?: ToasterProps['theme'];
  closeButton?: ToasterProps['closeButton'];
};

@Component({
    selector: 'ngx-sonner-test',
    imports: [NgxSonnerToaster],
    template: `
    <ngx-sonner-toaster
      [dir]="dir()"
      [theme]="theme()"
      [closeButton]="closeButton()">
      <svg
        success-icon
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-badge-check">
        <path
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </ngx-sonner-toaster>
    <button data-testid="trigger" (click)="onClick()">Trigger</button>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterTestComponent {
  callback = input.required<ToastTestInputs['callback']>();
  dir = input<ToasterProps['dir']>('auto');
  theme = input<ToasterProps['theme']>('light');
  closeButton = input<ToasterProps['closeButton']>(false);

  onClick() {
    this.callback()(toast);
  }
}
