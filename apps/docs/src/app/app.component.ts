import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SonnerService, ToasterComponent } from 'ngx-sonner';
import { CustomComponent } from './custom.component';

@Component({
  selector: 'ngx-sonner-root',
  standalone: true,
  imports: [ToasterComponent],
  template: `
    <ngx-sonner-toaster />

    <button (click)="sonner.message('Hello world!')">message</button>
    <button (click)="custom()">custom</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly sonner = inject(SonnerService);

  custom() {
    this.sonner.custom(CustomComponent, {
      componentProps: {
        label: 'Hello from component',
        description: 'This is an Angular component',
      },
    });
  }
}
