import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgxSonnerToaster, ToasterProps, toast } from 'ngx-sonner';

type ToastFn = (t: typeof toast) => void;

export type ToastTestInputs = {
  cb: ToastFn;
  dir?: ToasterProps['dir'];
  theme?: ToasterProps['theme'];
};

@Component({
  selector: 'ngx-sonner-test',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster [dir]="dir()" [theme]="theme()" />
    <button data-testid="trigger" (click)="onClick()">Trigger</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterTestComponent {
  cb = input.required<ToastTestInputs['cb']>();
  dir = input<ToasterProps['dir']>();
  theme = input<ToasterProps['theme']>('light');

  onClick() {
    this.cb()(toast);
  }
}
