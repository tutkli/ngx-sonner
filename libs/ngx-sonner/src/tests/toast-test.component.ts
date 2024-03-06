import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

type ToastFn = (t: typeof toast) => void;

export type ToastTestInputs = {
  cb: ToastFn;
};

@Component({
  selector: 'ngx-sonner-test',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster />
    <button data-testid="trigger" (click)="onClick()">Trigger</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastTestComponent {
  cb = input.required<ToastTestInputs['cb']>();

  onClick() {
    this.cb()(toast);
  }
}
