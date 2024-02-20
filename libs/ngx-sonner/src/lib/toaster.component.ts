import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  untracked,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconComponent } from './icon.component';
import { LoaderComponent } from './loader.component';
import { ToastPositionPipe } from './pipes/toast-position.pipe';
import { SONNER_CONFIG } from './sonner.config';
import { SonnerService } from './sonner.service';
import { ToastComponent } from './toast.component';
import { Position, ToasterProps } from './types';

@Component({
  selector: 'ngx-sonner-toaster',
  standalone: true,
  imports: [ToastComponent, ToastPositionPipe, IconComponent, LoaderComponent],
  template: `
    @if (toasts().length > 0) {
      <section
        [attr.aria-label]="'Notifications ' + hotKeyLabel()"
        [tabIndex]="-1">
        @for (pos of possiblePositions(); track pos) {
          <ol
            #listRef
            [tabIndex]="-1"
            [class]="_class()"
            data-sonner-toaster
            [attr.data-theme]="actualTheme()"
            [attr.data-rich-colors]="richColors()"
            [attr.dir]="dir() === 'auto' ? getDocumentDirection() : dir()"
            [attr.data-y-position]="pos.split('-')[0]"
            [attr.data-x-position]="pos.split('-')[1]"
            (blur)="handleBlur($event)"
            (focus)="handleFocus($event)"
            (mouseenter)="expanded.set(true)"
            (mousemove)="expanded.set(true)"
            (mouseleave)="handleMouseLeave()"
            (pointerdown)="interacting.set(true)"
            (pointerup)="interacting.set(false)"
            [style]="toasterStyles()">
            @for (
              toast of toasts() | toastPosition: $index : pos;
              track toast.id
            ) {
              <ngx-sonner-toast
                [index]="$index"
                [toast]="toast"
                [invert]="invert()"
                [visibleToasts]="visibleToasts()"
                [closeButton]="closeButton()"
                [interacting]="interacting()"
                [position]="position()"
                [expandByDefault]="expand()"
                [expanded]="expanded()"
                [actionButtonStyle]="toastOptions().actionButtonStyle ?? ''"
                [cancelButtonStyle]="toastOptions().cancelButtonStyle ?? ''"
                [class]="toastOptions().class ?? ''"
                [descriptionClass]="toastOptions().descriptionClass ?? ''"
                [classes]="toastOptions().classes ?? {}"
                [duration]="toastOptions().duration ?? duration()"
                [unstyled]="toastOptions().unstyled ?? false">
                <ngx-sonner-loader
                  [visible]="toast.type === 'loading'"
                  loading-icon />
                <ngx-sonner-icon type="success" success-icon />
                <ngx-sonner-icon type="error" error-icon />
                <ngx-sonner-icon type="warning" warning-icon />
                <ngx-sonner-icon type="info" info-icon />
              </ngx-sonner-toast>
            }
          </ol>
        }
      </section>
    }
  `,
  styleUrl: 'toaster.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnDestroy {
  private readonly sonner = inject(SonnerService);
  private readonly config = inject(SONNER_CONFIG);
  private readonly platformId = inject(PLATFORM_ID);

  toasts = this.sonner.toasts;
  heights = this.sonner.heights;

  invert = input<ToasterProps['invert']>(false);
  theme = input<ToasterProps['theme']>('light');
  position = input<ToasterProps['position']>('bottom-right');
  hotKey = input<ToasterProps['hotkey']>(['altKey', 'KeyT']);
  richColors = input<ToasterProps['richColors']>(false);
  expand = input<ToasterProps['expand']>(false);
  duration = input<ToasterProps['duration']>(this.config.toastLifetime);
  visibleToasts = signal<ToasterProps['visibleToasts']>(
    this.config.visibleToastsAmount
  );
  closeButton = signal<ToasterProps['closeButton']>(false);
  toastOptions = signal<ToasterProps['toastOptions']>({});
  offset = signal<ToasterProps['offset']>(null);
  dir = signal<ToasterProps['dir']>(this.getDocumentDirection());
  _class = input('', { alias: 'class' });
  _style = input<Record<string, string>>({}, { alias: 'style' });

  possiblePositions = computed(
    () =>
      Array.from(
        new Set(
          [
            this.position(),
            ...this.toasts()
              .filter(toast => toast.position)
              .map(toast => toast.position),
          ].filter(Boolean)
        )
      ) as Position[]
  );

  expanded = signal(false);
  interacting = signal(false);
  actualTheme = signal(this.getInitialTheme(this.theme()));

  // viewChild<HTMLOListElement>('listRef');
  @ViewChild('listRef') listRef!: ElementRef<HTMLOListElement>;
  lastFocusedElementRef = signal<HTMLElement | null>(null);
  isFocusWithinRef = signal(false);

  hotKeyLabel = computed(() =>
    this.hotKey().join('+').replace(/Key/g, '').replace(/Digit/g, '')
  );

  toasterStyles = computed(() => ({
    '--front-toast-height': `${this.heights()[0]?.height}px`,
    '--offset':
      typeof this.offset() === 'number'
        ? `${this.offset()}px`
        : this.offset() ?? `${this.config.viewportOffset}px`,
    '--width': `${this.config.toastWidth}px`,
    '--gap': `${this.config.gap}px`,
    ...this._style(),
  }));

  constructor() {
    effect(() => {
      if (this.toasts().length >= 1) {
        untracked(() => this.expanded.set(false));
      }
    });

    this.sonner.reset();
    document.addEventListener('keydown', this.handleKeydown);

    if (isPlatformBrowser(this.platformId)) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this.handleThemePreferenceChange);
    }

    effect(() => {
      const theme = this.theme();
      if (theme !== 'system') {
        untracked(() => this.actualTheme.set(theme));
      }
    });
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
    if (isPlatformBrowser(this.platformId)) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', this.handleThemePreferenceChange);
    }
  }

  handleBlur(event: FocusEvent) {
    if (
      this.isFocusWithinRef() &&
      !(event.target as HTMLOListElement).contains(
        event.relatedTarget as HTMLElement
      )
    ) {
      this.isFocusWithinRef.set(false);
      if (this.lastFocusedElementRef()) {
        this.lastFocusedElementRef()!.focus({ preventScroll: true });
        this.lastFocusedElementRef.set(null);
      }
    }
  }

  handleFocus(event: FocusEvent) {
    if (!this.isFocusWithinRef()) {
      this.isFocusWithinRef.set(true);
      this.lastFocusedElementRef.set(event.relatedTarget as HTMLElement);
    }
  }

  handleMouseLeave() {
    if (!this.interacting()) {
      this.expanded.set(false);
    }
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const isHotkeyPressed = this.hotKey().every(
      key => (event as any)[key] || event.code === key
    );

    if (isHotkeyPressed) {
      this.expanded.set(true);
      this.listRef.nativeElement?.focus();
    }

    if (
      event.code === 'Escape' &&
      (document.activeElement === this.listRef.nativeElement ||
        this.listRef.nativeElement?.contains(document.activeElement))
    ) {
      this.expanded.set(false);
    }
  };

  private handleThemePreferenceChange = ({ matches }: MediaQueryListEvent) => {
    this.actualTheme.set(matches ? 'dark' : 'light');
  };

  private getInitialTheme(t: string) {
    if (t !== 'system') {
      return t;
    }

    if (typeof window !== 'undefined') {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }

      return 'light';
    }

    return 'light';
  }

  getDocumentDirection(): ToasterProps['dir'] {
    if (typeof window === 'undefined') return 'ltr';
    if (typeof document === 'undefined') return 'ltr'; // For Fresh purpose

    const dirAttribute = document.documentElement.getAttribute('dir');

    if (dirAttribute === 'auto' || !dirAttribute) {
      return window.getComputedStyle(document.documentElement)
        .direction as ToasterProps['dir'];
    }

    return dirAttribute as ToasterProps['dir'];
  }
}
