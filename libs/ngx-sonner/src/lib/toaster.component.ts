import { isPlatformBrowser } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
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
import { toastState } from './state';
import { ToastComponent } from './toast.component';
import { Position, ToasterProps } from './types';

// Default lifetime of a toasts (in ms)
const TOAST_LIFETIME = 4000;

// Visible toasts amount
const VISIBLE_TOASTS_AMOUNT = 3;

// Viewport padding
const VIEWPORT_OFFSET = '32px';

// Default toast width
const TOAST_WIDTH = 356;

// Default gap between toasts
const GAP = 14;

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
  private readonly platformId = inject(PLATFORM_ID);

  toasts = toastState.toasts;
  heights = toastState.heights;
  reset = toastState.reset;

  invert = input<ToasterProps['invert'], unknown>(false, {
    transform: booleanAttribute,
  });
  theme = input<ToasterProps['theme']>('light');
  position = input<ToasterProps['position']>('bottom-right');
  hotKey = input<ToasterProps['hotkey']>(['altKey', 'KeyT']);
  richColors = input<ToasterProps['richColors'], unknown>(false, {
    transform: booleanAttribute,
  });
  expand = input<ToasterProps['expand'], unknown>(false, {
    transform: booleanAttribute,
  });
  duration = input<ToasterProps['duration'], unknown>(TOAST_LIFETIME, {
    transform: numberAttribute,
  });
  visibleToasts = input<ToasterProps['visibleToasts'], unknown>(
    VISIBLE_TOASTS_AMOUNT,
    { transform: numberAttribute }
  );
  closeButton = input<ToasterProps['closeButton'], unknown>(false, {
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
        : this.offset() ?? `${VIEWPORT_OFFSET}`,
    '--width': `${TOAST_WIDTH}px`,
    '--gap': `${GAP}px`,
    ...this._style(),
  }));

  constructor() {
    effect(() => {
      if (this.toasts().length >= 1) {
        untracked(() => this.expanded.set(false));
      }
    });

    this.reset();
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
    if (!this.listRef?.nativeElement) return;

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
