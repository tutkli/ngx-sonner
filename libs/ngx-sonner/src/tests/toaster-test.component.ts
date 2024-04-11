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
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [dir]="dir()"
      [theme]="theme()"
      [closeButton]="closeButton()" />
    <button data-testid="trigger" (click)="onClick()">Trigger</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
