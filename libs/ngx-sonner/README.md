# ngx-sonner

An opinionated toast component for Angular.

Based on [emilkowalski](https://github.com/emilkowalski)'s React [implementation](https://sonner.emilkowal.ski/).

## Angular compatibility

| ngx-sonner | @angular |
|------------|----------|
| 3.0.0      | ≥19.0.0  |
| 2.0.0      | ≥18.0.0  |
| 1.0.0      | ≥17.3.0  |

## Quick start

Install it with your favorite package manager:

```bash
npm i ngx-sonner
# or
yarn add ngx-sonner
# or
pnpm add ngx-sonner
# or
bun add ngx-sonner
```

Add `<ngx-sonner-toaster />` to your app, it will be the place where all your toasts will be rendered. After that, you can use `toast()` from anywhere in your app.

```ts
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster />
    <button (click)="toast('My first toast')">Give me a toast</button>
`
})
export class AppComponent {
  protected readonly toast = toast;
}
```

## Table of contents

- [toast()](#toast)
  - [Creating toasts](#creating-toasts)
    - [Default](#default)
    - [Success](#success)
    - [Info](#info)
    - [Warning](#warning)
    - [Error](#error)
    - [Action](#action)
    - [Cancel](#cancel)
    - [Promise](#promise)
    - [Loading](#loading)
    - [Custom component](#custom-component)
    - [Headless](#headless)
    - [Dynamic position](#dynamic-position)
  - [Other](#other)
    - [Updating a toast](#updating-a-toast)
    - [On Close Callback](#on-close-callback)
    - [Dismissing toasts programmatically](#dismissing-toasts-programmatically)
- [Toaster](#toaster)
  - [Theme](#theme)
  - [Position](#position)
  - [Expand](#expand)
  - [Custom Icons](#custom-icons)
  - [Close button](#close-button)
  - [Rich colors](#rich-colors)
  - [Custom offset](#custom-offset)
  - [Duration](#duration)
  - [Keyboard focus](#keyboard-focus)
- [Styling](#styling)
  - [TailwindCSS](#tailwind-css)

## toast()

Use it to render a toast. You can call it from anywhere, even outside of React.

### Creating toasts

#### Default

Most basic toast. You can customize it (and any other type) by passing an options object as the second argument.

```ts
toast('Event has been created');
```

With custom icon and description:

```ts
toast('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
  icon: IconComponent
});
```

#### Success

Renders a checkmark icon in front of the message.

```ts
toast.success('Event has been created');
```

#### Info

Renders a question mark icon in front of the message.

```ts
toast.info('Event has new information');
```

#### Warning

Renders a warning icon in front of the message.

```ts
toast.warning('Event has warning');
```

#### Error

Renders an error icon in front of the message.

```ts
toast.error('Event has not been created');
```

#### Action

Renders a primary button, clicking it will close the toast and run the callback passed via `onClick`.
You can prevent the toast from closing by calling `event.preventDefault()` in the onClick callback.

```ts
toast('My action toast', {
  action: {
    label: 'Action',
    onClick: () => console.log('Action!')
  }
});
```

#### Cancel

Renders a secondary button, clicking it will close the toast and run the callback passed via `onClick`.

```ts
toast('My cancel toast', {
  cancel: {
    label: 'Cancel',
    onClick: () => console.log('Cancel!'),
  },
});
```

#### Promise

Starts in a loading state and will update automatically after the promise resolves or fails.

```ts
toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
  loading: 'Loading',
  success: 'Success',
  error: 'Error'
});
```

You can pass a function to the success/error messages to incorporate the result/error of the promise.

```ts
toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return `${data.name} has been added!`;
  },
  error: 'Error'
});
```

#### Loading

Renders a toast with a loading spinner. Useful when you want to handle various states yourself instead of using a promise toast.

```ts
toast.loading('Loading data');
```

#### Custom Component

You can pass a component as the first argument instead of a string to render custom component while maintaining default styling.

```ts
toast(CustomComponent);
```

#### Headless

You can use `toast.custom()` to render an unstyled toast with a custom component while maintaining the functionality.

```ts
@Component({
  selector: 'app-custom',
  template: `
    <div>
      This is a custom component <button (click)="toastClick()">close</button>
    </div>
`
})
export class CustomComponent {
  toastClick() {
    console.log('Hello world!');
  }
}
```

```ts
import { CustomComponent } from './custom.component';

toast.custom(CustomComponent);
```

#### Dynamic position

You can change the position of the toast dynamically by passing a position prop to the toast function. It will not affect the positioning of other toasts.

```ts
// Available positions:
// top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
toast('Hello World', {
  position: 'top-center',
});
```

### Other

#### Updating a toast

You can update a toast by using the `toast` function and passing it the id of the toast you want to update, the rest stays the same.

```ts
const toastId = toast('Sonner');

toast.success('Toast has been updated', {
  id: toastId
});
```

#### On Close Callback

You can pass `onDismiss` and `onAutoClose` callbacks to each toast. `onDismiss` gets fired when either the close button gets clicked or the toast is swiped. `onAutoClose` fires when the toast disappears automatically after it's timeout (duration prop).

```ts
toast('Event has been created', {
  onDismiss: (t) => console.log(`Toast with id ${t.id} has been dismissed`),
  onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`),
});
```

#### Dismissing toasts programmatically

To remove a toast programmatically use `toast.dismiss(id)`. The `toast()` function return the id of the toast.

```ts
const toastId = toast('Event has been created');

toast.dismiss(toastId);
```

You can also dismiss all toasts at once by calling `toast.dismiss()` without an id.

```ts
toast.dismiss();
```

## Toaster

This component renders all the toasts, you can place it anywhere in your app.

### Theme

You can change the theme using the `theme` prop. Default theme is light.

```html
<ngx-sonner-toaster theme="dark" />
```

### Position

You can change the position through the `position` prop on the `<ngx-sonner-toaster />` component. Default is `bottom-right`.

```html
<!-- Available positions -->
<!-- top-left, top-center, top-right, bottom-left, bottom-center, bottom-right -->

<ngx-sonner-toaster position="top-center" />
```

### Expand

Toasts can also be expanded by default through the `expand` prop. You can also change the amount of visible toasts which is 3 by default.

```html
<ngx-sonner-toaster expand visibleToasts="9" />
```

### Custom icons

You can change the default icons by providing your icons inside the toaster component.

```html
<ngx-sonner-toaster>
  <custom-loading-icon loading-icon/>
  <custom-success-icon success-icon />
  <custom-error-icon error-icon />
  <custom-info-icon info-icon />
  <custom-warning-icon warning-icon />
</ngx-sonner-toaster>
```

### Close button

Add a close button to all toasts that shows on hover by adding the `closeButton` prop.

```html
<ngx-sonner-toaster closeButton />
```

### Rich colors

You can make error and success state more colorful by adding the `richColors` prop.

```html
<ngx-sonner-toaster richColors />
```

### Custom offset

Offset from the edges of the screen.

```html
<ngx-sonner-toaster offset="80px" />
```

### Duration

You can change the duration of each toast by using the `duration` property, or change the duration of all toasts like this:

```html
<ngx-sonner-toaster duration="10000" />
```

```ts
toast('Event has been created', {
  duration: 10000
});

// Persisent toast
toast('Event has been created', {
  duration: Number.POSITIVE_INFINITY
});
```

### Keyboard focus

You can focus on the toast area by pressing ⌥/alt + T. You can override it by providing an array of `event.code` values for each key.

```html
<ngx-sonner-toaster [hotKey]="['KeyC']" />
```

## Styling

Styling can be done globally via `toastOptions`, this way every toast will have the same styling.

```html
<ngx-sonner-toaster
  [toastOptions]="{
		style: { background: 'red' },
    className: 'my-toast',
	}"
/>
```

You can also use the same props when calling `toast` to style a specific toast.

```ts
toast('Event has been created', {
  style: 'background: red;',
  class: 'my-toast',
  descriptionClass: 'my-toast-description'
});
```

### Tailwind CSS

The preferred way to style the toasts with tailwind is by using the `unstyled` prop. That will give you an unstyled toast which you can then style with tailwind.

```html
<ngx-sonner-toaster
  [toastOptions]="{
		unstyled: true,
		classes: {
			toast: 'bg-blue-400',
			title: 'text-red-400',
			description: 'text-red-400',
			actionButton: 'bg-zinc-400',
			cancelButton: 'bg-orange-400',
			closeButton: 'bg-lime-400',
		}
	}"
/>
```

You can do the same when calling `toast()`.

```ts
toast('Hello World', {
  unstyled: true,
  classes: {
    toast: 'bg-blue-400',
    title: 'text-red-400 text-2xl',
    description: 'text-red-400',
    actionButton: 'bg-zinc-400',
    cancelButton: 'bg-orange-400',
    closeButton: 'bg-lime-400',
  },
})
```

Styling per toast type is also possible.

```html
<ngx-sonner-toaster
  [toastOptions]="{
		unstyled: true,
		classes: {
			error: 'bg-red-400',
			success: 'text-green-400',
			warning: 'text-yellow-400',
			info: 'bg-blue-400',
		}
	}"
/>
```

## License

[MIT](https://github.com/tutkli/ngx-sonner/blob/master/LICENSE)
