import { Injectable, signal, Type } from '@angular/core';
import {
  ExternalToast,
  HeightT,
  PromiseData,
  PromiseT,
  ToastT,
  ToastTypes,
} from './types';

@Injectable({ providedIn: 'root' })
export class SonnerService {
  private _toasts = signal<ToastT[]>([]);
  public toasts = this._toasts.asReadonly();

  private _heights = signal<HeightT[]>([]);
  public heights = this._heights.asReadonly();

  private toastsCounter = 0;

  addToast(data: ToastT) {
    this._toasts.update(prev => [data, ...prev]);
  }

  create(
    data: ExternalToast & {
      message?: string | Type<unknown>;
      type?: ToastTypes;
      promise?: PromiseT;
    }
  ) {
    const { message, ...rest } = data;
    const id =
      typeof data?.id === 'number' || (data.id && data.id?.length > 0)
        ? data.id
        : this.toastsCounter++;

    const dismissable = data.dismissable ?? true;
    const type = data.type ?? 'default';

    const alreadyExists = this._toasts().find(toast => toast.id === id);

    if (alreadyExists) {
      this._toasts.update(prev =>
        prev.map(toast => {
          if (toast.id === id) {
            return {
              ...toast,
              ...data,
              id,
              title: message,
              dismissable,
              type,
              updated: true,
            };
          } else return { ...toast, updated: false };
        })
      );
    } else {
      this.addToast({ ...rest, id, title: message, dismissable, type });
    }

    return id;
  }

  dismiss(id?: number | string) {
    if (id === undefined) {
      this._toasts.set([]);
      return;
    }
    this._toasts.update(prev => prev.filter(toast => toast.id !== id));

    return id;
  }

  message(message: string | Type<unknown>, data?: ExternalToast) {
    return this.create({ ...data, type: 'default', message });
  }

  error(message: string | Type<unknown>, data?: ExternalToast) {
    return this.create({ ...data, type: 'error', message });
  }

  success(message: string | Type<unknown>, data?: ExternalToast) {
    return this.create({ ...data, type: 'success', message });
  }

  info(message: string | Type<unknown>, data?: ExternalToast) {
    return this.create({ ...data, type: 'info', message });
  }

  warning(message: string | Type<unknown>, data?: ExternalToast) {
    return this.create({ ...data, type: 'warning', message });
  }

  loading(message: string | Type<unknown>, data?: ExternalToast) {
    return this.create({ ...data, type: 'loading', message });
  }

  promise<ToastData>(
    promise: PromiseT<ToastData>,
    data?: PromiseData<ToastData>
  ) {
    if (!data) return;

    let id: string | number | undefined = undefined;
    if (data.loading !== undefined) {
      id = this.create({
        ...data,
        promise,
        type: 'loading',
        message: data.loading,
      });
    }

    const p = promise instanceof Promise ? promise : promise();

    let shouldDismiss = id !== undefined;

    p.then(response => {
      // @ts-expect-error: Incorrect response type
      if (response && typeof response.ok === 'boolean' && !response.ok) {
        shouldDismiss = false;

        const message =
          typeof data.error === 'function'
            ? // @ts-expect-error: TODO: Better function checking
              data.error(`HTTP error! status: ${response.status}`)
            : data.error;
        this.create({ id, type: 'error', message });
      } else if (data.success !== undefined) {
        shouldDismiss = false;

        const message =
          typeof data.success === 'function'
            ? // @ts-expect-error: TODO: Better function checking
              data.success(response)
            : data.success;
        this.create({ id, type: 'success', message });
      }
    })
      .catch(error => {
        if (data.error !== undefined) {
          shouldDismiss = false;
          const message =
            // @ts-expect-error: TODO: Better function checking
            typeof data.error === 'function' ? data.error(error) : data.error;
          this.create({ id, type: 'error', message });
        }
      })
      .finally(() => {
        if (shouldDismiss) {
          // Toast is still in load state (and will be indefinitely — dismiss it)
          this.dismiss(id);
          id = undefined;
        }

        data.finally?.();
      });

    return id;
  }

  custom<T>(component: Type<T>, data?: ExternalToast) {
    const id = data?.id ?? this.toastsCounter++;
    this.create({ component, id, ...data });

    return id;
  }

  removeHeight(id: number | string) {
    this._heights.update(prev => prev.filter(height => height.toastId !== id));
  }

  addHeight(height: HeightT) {
    this._heights.update(prev => [height, ...prev]);
  }

  reset() {
    this._toasts.set([]);
    this._heights.set([]);
  }
}
