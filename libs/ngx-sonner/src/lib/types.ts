import { TemplateRef, Type } from '@angular/core';

export type Expand<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: O[K] }
    : never
  : T;

export type ToastTypes =
  | 'action'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'loading'
  | 'default';

export type PromiseT<Data = unknown> = Promise<Data> | (() => Promise<Data>);

export type PromiseData<ToastData = unknown> = ExternalToast & {
  loading?: string | Type<unknown>;
  success?:
    | string
    | Type<unknown>
    | ((data: ToastData) => Type<unknown> | string);
  error?: string | Type<unknown> | ((error: unknown) => Type<unknown> | string);
  finally?: () => void | Promise<void>;
};

export type ToastT = {
  id: number | string;
  title?: string | Type<unknown>;
  type?: ToastTypes;
  icon?: Type<unknown>;
  component?: Type<unknown>;
  componentProps?: Record<string, unknown>;
  invert?: boolean;
  closeButton?: boolean;
  dismissible?: boolean;
  description?: string | Type<unknown>;
  duration?: number;
  delete?: boolean;
  important?: boolean;
  action?: {
    label: string;
    onClick: (event: MouseEvent) => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  promise?: PromiseT;
  cancelButtonStyle?: string;
  actionButtonStyle?: string;
  style?: Record<string, unknown>;
  unstyled?: boolean;
  class?: string;
  classes?: ToastClassnames;
  descriptionClass?: string;
  position?: Position;
  /**
   * @internal This is used to determine if the toast has been updated to determine when to reset timer.
   */
  updated?: boolean;
};

export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export type HeightT = {
  height: number;
  toastId: number | string;
};

export enum SwipeStateTypes {
  SwipedOut = 'SwipedOut',
  SwipedBack = 'SwipedBack',
  NotSwiped = 'NotSwiped',
}

export type Theme = 'light' | 'dark' | 'system';

export type ToastToDismiss = {
  id: number | string;
  dismiss: boolean;
};

export type ExternalToast = Omit<ToastT, 'id' | 'type' | 'title'> & {
  id?: number | string;
};

export type ToasterProps = {
  /**
   * Dark toasts in light mode and vice versa.
   *
   * @default false
   */
  invert: boolean;

  /**
   * Toast's theme, either light, dark, or system
   *
   * @default 'light'
   */
  theme: 'light' | 'dark' | 'system';

  /**
   * Place where the toasts will be rendered
   *
   * @default 'bottom-right'
   */
  position: Position;

  /**
   * Keyboard shortcut that will move focus to the toaster area.
   *
   * @default '⌥/alt + T'
   */
  hotkey: string[];

  /**
   * Makes error and success state more colorful
   *
   * @default false
   */
  richColors: boolean;

  /**
   * Toasts will be expanded by default
   *
   * @default false
   */
  expand: boolean;

  /**
   * The duration of the toast in milliseconds.
   *
   * @default 4000
   */
  duration: number;

  /**
   * Amount of visible toasts
   *
   * @default 3
   */
  visibleToasts: number;

  /**
   * Adds a close button to all toasts, shows on hover
   *
   * @default false
   */
  closeButton: boolean;

  /**
   * These will act as default options for all toasts.
   *
   * @default {}
   */
  toastOptions: ToastOptions;

  /**
   * Offset from the edges of the screen.
   *
   * @default '32px'
   */
  offset: string | number | null;

  /**
   * Directionality of toast's text
   *
   * @default 'ltr'
   */
  dir: 'ltr' | 'rtl' | 'auto';

  /**
   * Gap between toasts when expanded, in pixels.
   *
   * @default '14px'
   */
  gap: number;

  /**
   * Changes the default loading icon
   *
   * @default -
   */
  loadingIcon: TemplateRef<unknown>;
};

export type ToastOptions = {
  /**
   * The classes applied to the toast element.
   */
  class?: string;

  /**
   * The classes applied to the toast description element.
   */
  descriptionClass?: string;

  /**
   * The CSS styles applied to the toast element.
   */
  style?: Record<string, unknown>;

  /**
   * The CSS styles applied to the cancel button element.
   */
  cancelButtonStyle?: string;

  /**
   * The CSS styles applied to the action button element.
   */
  actionButtonStyle?: string;

  /**
   * The duration of the toast in milliseconds.
   */
  duration?: number;

  /**
   * Whether the toast should be unstyled or not.
   */
  unstyled?: boolean;

  /**
   * Classes to apply to the various elements of the toast.
   */
  classes?: Expand<ToastClassnames>;
};

/**
 * The classes applied to the various elements of the toast.
 */
export type ToastClassnames = {
  toast?: string;
  title?: string;
  description?: string;
  loader?: string;
  closeButton?: string;
  cancelButton?: string;
  actionButton?: string;
} & ToastTypeClasses;

type ToastTypeClasses = Partial<Record<ToastTypes, string>>;

export type ToastProps = {
  toast: ToastT;
  index: number;
  expanded: boolean;
  invert: boolean;
  position: Position;
  visibleToasts: number;
  expandByDefault: boolean;
  closeButton: boolean;
  interacting: boolean;
  cancelButtonStyle: string;
  actionButtonStyle: string;
  duration: number | null;
  descriptionClass: string;
  classes: ToastClassnames;
  unstyled: boolean;
};
