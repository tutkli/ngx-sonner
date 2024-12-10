import { isPlatformBrowser } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconComponent } from './icon.component';
import {
  GAP,
  TOAST_LIFETIME,
  TOAST_WIDTH,
  VIEWPORT_OFFSET,
  VISIBLE_TOASTS_AMOUNT,
} from './internal/constants';
import { LoaderComponent } from './loader.component';
import { ToastFilterPipe } from './pipes/toast-filter.pipe';
import { toastState } from './state';
import { ToastComponent } from './toast.component';
import { Position, Theme, ToasterProps } from './types';

@Component({
  selector: 'ngx-sonner-toaster',
  imports: [ToastComponent, ToastFilterPipe, IconComponent, LoaderComponent],
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
            (pointerdown)="handlePointerDown($event)"
            (pointerup)="interacting.set(false)"
            [style]="toasterStyles()">
            @for (
              toast of toasts() | toastFilter: $index : pos;
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
                [actionButtonStyle]="toastOptions().actionButtonStyle"
                [cancelButtonStyle]="toastOptions().cancelButtonStyle"
                [class]="toastOptions().class ?? ''"
                [descriptionClass]="toastOptions().descriptionClass ?? ''"
                [classes]="toastOptions().classes ?? {}"
                [duration]="toastOptions().duration ?? duration()"
                [unstyled]="toastOptions().unstyled ?? false">
                <ng-content select="[loading-icon]" loading-icon>
                  <ngx-sonner-loader [isVisible]="toast.type === 'loading'" />
                </ng-content>
                <ng-content select="[success-icon]" success-icon>
                  <ngx-sonner-icon type="success" />
                </ng-content>
                <ng-content select="[error-icon]" error-icon>
                  <ngx-sonner-icon type="error" />
                </ng-content>
                <ng-content select="[warning-icon]" warning-icon>
                  <ngx-sonner-icon type="warning" />
                </ng-content>
                <ng-content select="[info-icon]" info-icon>
                  <ngx-sonner-icon type="info" />
                </ng-content>
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
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NgxSonnerToaster implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  toasts = toastState.toasts;
  heights = toastState.heights;
  reset = toastState.reset;

  invert = input<ToasterProps['invert'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  theme = input<ToasterProps['theme']>('light');
  position = input<ToasterProps['position']>('bottom-right');
  hotKey = input<ToasterProps['hotkey']>(['altKey', 'KeyT']);
  richColors = input<ToasterProps['richColors'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  expand = input<ToasterProps['expand'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  duration = input<ToasterProps['duration'], number | string>(TOAST_LIFETIME, {
    transform: numberAttribute,
  });
  visibleToasts = input<ToasterProps['visibleToasts'], number | string>(
    VISIBLE_TOASTS_AMOUNT,
    { transform: numberAttribute }
  );
  closeButton = input<ToasterProps['closeButton'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  toastOptions = input<ToasterProps['toastOptions']>({});
  offset = input<ToasterProps['offset']>(null);
  dir = input<ToasterProps['dir']>(this.getDocumentDirection());
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

  expanded = linkedSignal({
    source: this.toasts,
    computation: toasts => toasts.length < 1,
  });
  actualTheme = linkedSignal({
    source: this.theme,
    computation: newTheme => this.getActualTheme(newTheme),
  });
  interacting = signal(false);

  listRef = viewChild<ElementRef<HTMLOListElement>>('listRef');
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
        : this.offset() ?? `${VIEWPORT_OFFSET}`,
    '--width': `${TOAST_WIDTH}px`,
    '--gap': `${GAP}px`,
    ...this._style(),
  }));

  constructor() {
    this.reset();

    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.handleKeydown);
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this.handleThemePreferenceChange);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.handleKeydown);
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
        this.lastFocusedElementRef()?.focus({ preventScroll: true });
        this.lastFocusedElementRef.set(null);
      }
    }
  }

  handleFocus(event: FocusEvent) {
    const isNotDismissible =
      event.target instanceof HTMLElement &&
      event.target.dataset['dismissible'] === 'false';

    if (isNotDismissible) return;

    if (!this.isFocusWithinRef()) {
      this.isFocusWithinRef.set(true);
      this.lastFocusedElementRef.set(event.relatedTarget as HTMLElement);
    }
  }

  handlePointerDown(event: MouseEvent) {
    const isNotDismissible =
      event.target instanceof HTMLElement &&
      event.target.dataset['dismissible'] === 'false';

    if (isNotDismissible) return;
    this.interacting.set(true);
  }

  handleMouseLeave() {
    if (!this.interacting()) {
      this.expanded.set(false);
    }
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const listRef = this.listRef()?.nativeElement;
    if (!listRef) return;

    const isHotkeyPressed = this.hotKey().every(
      key => (event as never)[key] || event.code === key
    );

    if (isHotkeyPressed) {
      this.expanded.set(true);
      listRef.focus();
    }

    if (
      event.code === 'Escape' &&
      (document.activeElement === listRef ||
        listRef.contains(document.activeElement))
    ) {
      this.expanded.set(false);
    }
  };

  private handleThemePreferenceChange = ({ matches }: MediaQueryListEvent) => {
    if (this.theme() === 'system') {
      this.actualTheme.set(matches ? 'dark' : 'light');
    }
  };

  private getActualTheme(theme: Theme): Theme {
    if (theme !== 'system') {
      return theme;
    }

    if (isPlatformBrowser(this.platformId)) {
      const prefersDark = window.matchMedia?.(
        '(prefers-color-scheme: dark)'
      ).matches;
      return prefersDark ? 'dark' : 'light';
    }

    return 'light';
  }

  getDocumentDirection(): ToasterProps['dir'] {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return 'ltr';
    }

    const dirAttribute = document.documentElement.getAttribute('dir');

    if (!dirAttribute || dirAttribute === 'auto') {
      return window.getComputedStyle(document.documentElement)
        .direction as ToasterProps['dir'];
    }

    return dirAttribute as ToasterProps['dir'];
  }
}
