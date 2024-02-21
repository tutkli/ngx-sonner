import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { CodeBlockComponent } from './code-block.component';
import { CustomComponent } from './custom.component';

@Component({
  selector: 'docs-types',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div>
      <h2>Types</h2>
      <p>
        You can customize the type of toast you want to render, and pass an
        options object as the second argument.
      </p>
      <div class="buttons">
        @for (type of allTypes; track $index) {
          <button
            class="button"
            data-testid="{type.name}"
            [attr.data-active]="activeType().name === type.name"
            (click)="type.action(); activeType.set(type)">
            {{ type.name }}
          </button>
        }
      </div>
      <docs-code-block [code]="activeType().snippet" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeComponent {
  allTypes = [
    {
      name: 'Default',
      snippet: "toast('Event has been created')",
      action: () => toast('Event has been created'),
    },
    {
      name: 'Description',
      snippet: `toast.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm'
})`,
      action: () =>
        toast.message('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        }),
    },
    {
      name: 'Success',
      snippet: "toast.success('Event has been created')",
      action: () => toast.success('Event has been created'),
    },
    {
      name: 'Info',
      snippet: "toast.info('Event will be created')",
      action: () => toast.info('Event will be created'),
    },
    {
      name: 'Warning',
      snippet: "toast.warning('Event has warnings')",
      action: () => toast.warning('Event has warnings'),
    },
    {
      name: 'Error',
      snippet: "toast.error('Event has not been created')",
      action: () => toast.error('Event has not been created'),
    },
    {
      name: 'Action',
      snippet: `toast('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
})`,
      action: () =>
        toast('Event has been created', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        }),
    },
    {
      name: 'Promise',
      snippet: `const promise = new Promise((resolve, reject) => setTimeout(() => {
  if (Math.random() > 0.5) {
    resolve({ name: 'ngx-sonner' });
  } else {
    reject();
  }
}, 1500));

toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return data.name +  " toast has been added";
  },
  error: 'Error... :( Try again!',
});`,
      action: () =>
        toast.promise<{ name: string }>(
          () =>
            new Promise(resolve =>
              setTimeout(() => {
                resolve({ name: 'ngx-sonner' });
              }, 1500)
            ),
          {
            loading: 'Loading...',
            success: data => {
              return `${data.name} toast has been added`;
            },
            error: 'Error... :( Try again!',
          }
        ),
    },
    {
      name: 'Loading',
      snippet: "toast.loading('Loading...')",
      action: () => {
        toast.loading('Loading...');
      },
    },
    {
      name: 'Custom',
      snippet: `toast.custom(CustomComponent)`,
      action: () => toast.custom(CustomComponent, { duration: 1000000 }),
    },
  ];

  activeType = signal(this.allTypes[0]);
}
