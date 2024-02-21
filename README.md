# ngx-sonner

An opinionated toast component for Angular.

Based on [emilkowalski](https://github.com/emilkowalski)'s React [implementation](https://sonner.emilkowal.ski/).

## Quick start

Install it:

```bash
npm i ngx-sonner
# or
yarn add ngx-sonner
# or
pnpm add ngx-sonner
```

Add `<ngx-sonner-toaster />` to your app, it will be the place where all your toasts will be rendered. After that, you can use the `SonnerService` from anywhere in your app.

```ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster />
    <button (click)="sonner.message('My first toast')">Give me a toast</button>
`
})
export class AppComponent {
  protected readonly sonner = inject(SonnerService);
}
```

## Types

### Message

Most basic toast. You can customize it (and any other type) by passing an options object as the second argument.

```ts
this.sonner.message('Event has been created');
```

With custom icon and description:

```js
this.sonner.message('Event has been created', {
	description: 'Monday, January 3rd at 6:00pm',
	icon: IconComponent
});
```

### Success

Renders a checkmark icon in front of the message.

```ts
this.sonner.success('Event has been created');
```

### Info

Renders a question mark icon in front of the message.

```ts
this.sonner.info('Event has new information');
```

### Warning

Renders a warning icon in front of the message.

```ts
this.sonner.warning('Event has warning');
```

### Error

Renders an error icon in front of the message.

```ts
this.sonner.error('Event has not been created');
```

### Action

Renders a button.

```ts
this.sonner.message('Event has been created', {
	action: {
		label: 'Undo',
		onClick: () => console.log('Undo')
	}
});
```

### Promise

Starts in a loading state and will update automatically after the promise resolves or fails.

```ts
this.sonner.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
	loading: 'Loading',
	success: 'Success',
	error: 'Error'
});
```

You can pass a function to the success/error messages to incorporate the result/error of the promise.

```js
this.sonner.promise(promise, {
	loading: 'Loading...',
	success: (data) => {
		return `${data.name} has been added!`;
	},
	error: 'Error'
});
```

### Custom Component

You can pass a component as the first argument instead of a string to render custom component while maintaining default styling. You can use the headless version below for a custom, unstyled toast.

```js
this.sonner.message(CustomComponent);
```

### Updating a toast

You can update a toast by using the `toast` function and passing it the id of the toast you want to update, the rest stays the same.

```ts
const toastId = this.sonner.message('Sonner');

this.sonner.success('Toast has been updated', {
	id: toastId
});
```

## Customization

### Headless

You can use `this.sonner.custom()` to render an unstyled toast with custom component while maintaining the functionality.

```ts
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom',
  standalone: true,
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

this.sonner.custom(CustomComponent);
```

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

### Expanded

Toasts can also be expanded by default through the `expand` prop. You can also change the amount of visible toasts which is 3 by default.

```html
<ngx-sonner-toaster expand visibleToasts="9" />
```

### Styling

Styling can be done globally via `toastOptions`, this way every toast will have the same styling.

```html
<ngx-sonner-toaster
	[toastOptions]="{
		style: 'background: red;',
		class: 'my-toast',
		descriptionClass: 'my-toast-description'
	}"
/>
```

You can also use the same props when using the `SonnerService` to style a specific toast.

```ts
this.sonner.message('Event has been created', {
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

You can do the same when using the `SonnerService`.

```ts
this.sonner.message('Hello World', {
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

### Programmatically remove toast

To remove a toast programmatically use `this.sonner.dismiss(id)`.

```ts
const toastId = this.sonner.message('Event has been created');

this.sonner.dismiss(toastId);
```

You can also dismiss all toasts at once by calling `this.sonner.dismiss()` without an id.

```ts
this.sonner.dismiss();
```

### Duration

You can change the duration of each toast by using the `duration` property, or change the duration of all toasts like this:

```html
<ngx-sonner-toaster duration="10000" />
```

```ts
this.sonner.message('Event has been created', {
	duration: 10000
});

// Persisent toast
this.sonner.message('Event has been created', {
	duration: Number.POSITIVE_INFINITY
});
```

### On Close Callback

You can pass `onDismiss` and `onAutoClose` callbacks. `onDismiss` gets fired when either the close button gets clicked or the toast is swiped. `onAutoClose` fires when the toast disappears automatically after it's timeout (`duration` prop).

```ts
this.sonner.message('Event has been created', {
	onDismiss: (t) => console.log(`Toast with id ${t.id} has been dismissed`),
	onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`)
});
```

## Keyboard focus

You can focus on the toast area by pressing ⌥/alt + T. You can override it by providing an array of `event.code` values for each key.

```html
<ngx-sonner-toaster [hotKey]="['KeyC']" />
```

## License

MIT
