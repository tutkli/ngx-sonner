export const usageSnippet = `import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [NgxSonnerToaster],
  template: \`
    <ngx-sonner-toaster />
    <button (click)="toast('My first toast')">Give me a toast</button>
  \`,
})
export class AppComponent {
  protected readonly toast = toast;
}`;
