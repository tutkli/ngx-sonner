import { render } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { toastState } from 'ngx-sonner';
import { ToastTestComponent, ToastTestInputs } from './toast-test.component';
import { sleep } from './utils';

async function setup(inputs: ToastTestInputs) {
  const user = userEvent.setup();
  const returned = await render(ToastTestComponent, {
    componentInputs: inputs,
    autoDetectChanges: true,
  });
  const trigger = returned.getByTestId('trigger');

  return {
    trigger,
    user,
    ...returned,
  };
}

describe('Toast', () => {
  beforeEach(() => {
    toastState.reset();
  });

  it('should render a toast', async () => {
    const { user, trigger, container, getByText } = await setup({
      cb: toast => toast('Hello world'),
    });

    await user.click(trigger);
    expect(getByText('Hello world')).toBeVisible();

    const toasts = Array.from(
      container.querySelectorAll('[data-sonner-toast]')
    );
    expect(toasts.length).toBe(1);
  });

  it('should render a toast that disappears after the default timeout', async () => {
    const { user, trigger, container, detectChanges } = await setup({
      cb: toast => toast('Hello world'),
    });

    await user.click(trigger);
    expect(
      Array.from(container.querySelectorAll('[data-sonner-toast]')).length
    ).toBe(1);
    await sleep(4050);
    detectChanges();
    expect(
      Array.from(container.querySelectorAll('[data-sonner-toast]')).length
    ).toBe(1);
  });

  it('should show correct toast content based on promise state', async () => {
    const { user, trigger, queryByText, getByText, detectChanges } =
      await setup({
        cb: toast =>
          toast.promise<string>(
            () =>
              new Promise(resolve =>
                setTimeout(() => {
                  resolve('Loaded');
                }, 2000)
              ),
            {
              loading: 'Loading...',
              success: data => data,
              error: 'Error',
            }
          ),
      });

    await user.click(trigger);
    expect(getByText('Loading...')).toBeVisible();
    await sleep(2000);
    detectChanges();
    expect(queryByText('Loading...')).toBeNull();
    expect(getByText('Loaded')).toBeVisible();
  });

  it('should show a toast with custom duration', async () => {
    const { user, trigger, queryByText, detectChanges } = await setup({
      cb: toast => toast('Hello world', { duration: 300 }),
    });

    expect(queryByText('Hello world')).toBeNull();

    await user.click(trigger);
    expect(queryByText('Hello world')).not.toBeNull();

    await sleep(500);
    detectChanges();
    expect(queryByText('Hello world')).toBeNull();
  });

  it('should focus the toast when hotkey is pressed', async () => {
    const { user, trigger, getByText } = await setup({
      cb: toast => toast('Hello world', { duration: 5000 }),
    });

    await user.click(trigger);
    expect(getByText('Hello world')).toBeVisible();

    await user.keyboard('{Alt>}T{/Alt}');
    await sleep(100);
    expect(document.activeElement).toBeInstanceOf(HTMLOListElement);
  });

  it('should not immediately close the toast when reset', async () => {
    const { user, trigger, getByText, queryByText, detectChanges } =
      await setup({
        cb: toast => {
          const id = toast('Loading', { duration: 4000 });

          setTimeout(() => {
            toast.success('Finished loading!', { id });
          }, 1000);
        },
      });

    await user.click(trigger);
    expect(getByText('Loading')).toBeVisible();
    await sleep(2050);
    detectChanges();
    expect(queryByText('Loading')).toBeNull();
    expect(getByText('Finished loading!')).toBeVisible();
    await sleep(1000);
    detectChanges();
    expect(getByText('Finished loading!')).toBeVisible();
  });

  it('should reset duration on a toast update', async () => {
    const { user, trigger, getByText, queryByText, detectChanges } =
      await setup({
        cb: toast => {
          const id = toast('Loading', { duration: 2000 });

          setTimeout(() => {
            toast.success('Finished loading!', { id });
          }, 1500);
        },
      });

    await user.click(trigger);
    expect(getByText('Loading')).toBeVisible();
    await sleep(1500);
    detectChanges();
    expect(queryByText('Loading')).toBeNull();
    expect(getByText('Finished loading!')).toBeVisible();
    // there would only be ~.5 seconds left on the original toast
    // so we're going to wait .5 seconds to make sure the timer is reset
    await sleep(500);
    detectChanges();
    expect(getByText('Finished loading!')).toBeVisible();
    // finally we'll wait another 1500ms to make sure the toast closes after 2 seconds
    // since the original toast had a duration of 2 seconds
    await sleep(2000);
    detectChanges();
    expect(queryByText('Finished loading!')).toBeNull();
  });

  it('should allow duration updates on toast update', async () => {
    const { user, trigger, getByText, queryByText, detectChanges } =
      await setup({
        cb: toast => {
          const id = toast('Loading', { duration: 2000 });

          setTimeout(() => {
            toast.success('Finished loading!', { id, duration: 4000 });
          }, 1000);
        },
      });

    await user.click(trigger);
    expect(getByText('Loading')).toBeVisible();
    await sleep(1200);
    detectChanges();
    expect(queryByText('Loading')).toBeNull();
    expect(getByText('Finished loading!')).toBeVisible();
    await sleep(2200);
    detectChanges();
    expect(getByText('Finished loading!')).toBeVisible();
  });

  it('should render a toast with custom class', async () => {
    const { user, trigger, container } = await setup({
      cb: toast =>
        toast('Hello world', {
          classes: {
            toast: 'test-class',
          },
        }),
    });

    await user.click(trigger);
    const toast = container.querySelector('[data-sonner-toast]');
    expect(toast).not.toBeNull();
    expect(toast as Element).toHaveClass('test-class');
  });
});