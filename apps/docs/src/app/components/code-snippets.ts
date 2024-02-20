export const usageSnippet = `import { SonnerService } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToasterComponent],
  template: \`
    <ngx-sonner-toaster />
    <button (click)="sonner.message('My first toast')">Give me a toast</button>
  \`,
})
export class AppComponent {
  protected readonly sonner = inject(SonnerService);
}`;
