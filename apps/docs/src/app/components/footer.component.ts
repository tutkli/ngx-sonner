import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-footer',
  standalone: true,
  template: `
    <footer class="wrapper">
      <div class="container">
        <p class="p">
          <span>
            Made by
            <a href="https://github.com/tutkli" target="_blank">Tutkli</a>
            .
          </span>
        </p>
      </div>
    </footer>
  `,
  styles: `
    .wrapper {
      padding: 32px 0;
      border-top: 1px solid var(--gray3);
      background: var(--gray1);
      margin-top: 164px;
    }

    .p {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
      font-size: 14px;
    }

    .p img {
      border-radius: 50%;
    }

    .p a {
      font-weight: 600;
      color: inherit;
      text-decoration: none;
    }

    .p a:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .wrapper {
        margin-top: 128px;
        padding: 16px 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
