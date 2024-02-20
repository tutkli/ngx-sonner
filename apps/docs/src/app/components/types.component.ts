import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SonnerService } from 'ngx-sonner';
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
  private readonly sonner = inject(SonnerService);

  allTypes = [
    {
      name: 'Default',
      snippet: "this.sonner.create({message: 'Event has been created'})",
      action: () => this.sonner.create({ message: 'Event has been created' }),
    },
    {
      name: 'Description',
      snippet: `this.sonner.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm'
})`,
      action: () =>
        this.sonner.message('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        }),
    },
    {
      name: 'Success',
      snippet: "this.sonner.success('Event has been created')",
      action: () => this.sonner.success('Event has been created'),
    },
    {
      name: 'Info',
      snippet: "this.sonner.info('Event will be created')",
      action: () => this.sonner.info('Event will be created'),
    },
    {
      name: 'Warning',
      snippet: "this.sonner.warning('Event has warnings')",
      action: () => this.sonner.warning('Event has warnings'),
    },
    {
      name: 'Error',
      snippet: "this.sonner.error('Event has not been created')",
      action: () => this.sonner.error('Event has not been created'),
    },
    {
      name: 'Action',
      snippet: `this.sonner.message('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
})`,
      action: () =>
        this.sonner.message('Event has been created', {
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

this.sonner.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return data.name +  " toast has been added";
  },
  error: 'Error... :( Try again!',
});`,
      action: () =>
        this.sonner.promise<{ name: string }>(
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
      snippet: "this.sonner.loading('Loading...')",
      action: () => {
        this.sonner.loading('Loading...');
      },
    },
    {
      name: 'Custom',
      snippet: `this.sonner.custom(CustomComponent)`,
      action: () => this.sonner.custom(CustomComponent, { duration: 1000000 }),
    },
  ];

  activeType = signal(this.allTypes[0]);
}
