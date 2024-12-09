import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgxSonnerToaster, Position } from 'ngx-sonner';
import { ExpandComponent } from './components/expand.component';
import { FooterComponent } from './components/footer.component';
import { HeroComponent } from './components/hero.component';
import { InstallationComponent } from './components/installation.component';
import { OtherComponent } from './components/other.component';
import { PositionComponent } from './components/position.component';
import { TypeComponent } from './components/types.component';
import { UsageComponent } from './components/usage.component';

@Component({
    selector: 'docs-root',
    imports: [
        NgxSonnerToaster,
        HeroComponent,
        InstallationComponent,
        UsageComponent,
        TypeComponent,
        PositionComponent,
        ExpandComponent,
        OtherComponent,
        FooterComponent,
    ],
    template: `
    <ngx-sonner-toaster
      [expand]="expand()"
      [position]="position()"
      [richColors]="richColors()"
      [closeButton]="closeButton()" />

    <main class="container">
      <docs-hero />
      <div class="content">
        <docs-installation />
        <docs-usage />
        <docs-types />
        <docs-position [(position)]="position" />
        <docs-expand [(expand)]="expand" />
        <docs-other [(richColors)]="richColors" [(closeButton)]="closeButton" />
      </div>
    </main>
    <docs-footer />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  expand = signal(false);
  position = signal<Position>('bottom-right');
  richColors = signal(false);
  closeButton = signal(false);
}
