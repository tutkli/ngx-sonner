import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'ngx-sonner-loader',
  standalone: true,
  template: `
    <div class="sonner-loading-wrapper" [attr.data-visible]="visible()">
      <div class="sonner-spinner">
        @for (_ of bars; track $index) {
          <div class="sonner-loading-bar"></div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  visible = input.required({ transform: booleanAttribute });
  bars = Array(12).fill(0);
}
