export const usageSnippet = `import { toast, ToastComponent } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToasterComponent],
  template: \`
    <ngx-sonner-toaster />
    <button (click)="toast('My first toast')">Give me a toast</button>
  \`,
})
export class AppComponent {
  protected readonly toast = toast;
}`;
