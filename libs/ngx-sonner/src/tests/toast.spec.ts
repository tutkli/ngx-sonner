import {ToastTestComponent, ToastTestInputs} from "./toast-test.component";
import userEvent from '@testing-library/user-event';
import {render} from "@testing-library/angular";
import {toastState} from "ngx-sonner";

async function setup(inputs: ToastTestInputs) {
  const user = userEvent.setup();
  const returned = await render(ToastTestComponent, {componentInputs: inputs});
  const trigger = returned.getByTestId('trigger');

  return {
    trigger,
    user,
    ...returned,
  }
}

describe('Toast', () => {
  beforeEach(() => {
    toastState.reset();
  });

  it('should show a toast', async () => {
    const { user, trigger, container, getByText } = await setup({
      cb: (toast) => toast('Hello world'),
    })

    await user.click(trigger);
    expect(getByText('Hello world')).toBeVisible();

    const toasts = Array.from(container.querySelectorAll('[data-sonner-toast]'));
    expect(toasts.length).toBe(1);
  })
})
