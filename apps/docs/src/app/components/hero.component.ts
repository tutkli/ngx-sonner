import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'docs-hero',
  template: `
    <div class="wrapper">
      <div class="toastWrapper">
        <div class="toast"></div>
        <div class="toast"></div>
        <div class="toast"></div>
      </div>
      <h1 class="heading">ngx-sonner</h1>
      <p style="margin-top: 0; font-size: 18px">
        An opinionated toast component for Angular.
      </p>
      <div class="buttons">
        <button
          data-testid="default-button"
          data-primary
          (click)="
            toast('Sonner', {
              description: 'An opinionated toast component for Angular.',
            })
          "
          class="button">
          Render a toast
        </button>
        <a
          class="button"
          href="https://github.com/tutkli/ngx-sonner"
          target="_blank">
          GitHub
        </a>
      </div>
    </div>
  `,
  styles: `
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }

    .toastWrapper {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      height: 100px;
      width: 400px;
      position: relative;
      mask-image: linear-gradient(to top, transparent 0%, black 35%);
      -webkit-mask-image: linear-gradient(to top, transparent 0%, black 35%);
      opacity: 1;
    }

    .toast {
      width: 356px;
      height: 40px;
      background: var(--gray0);
      box-shadow: 0 4px 12px #0000001a;
      border: 1px solid var(--gray3);
      border-radius: 6px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast:nth-child(1) {
      transform: translateY(-60%) translateX(-50%) scale(0.9);
    }

    .toast:nth-child(2) {
      transform: translateY(-30%) translateX(-50%) scale(0.95);
    }

    .buttons {
      display: flex;
      gap: 8px;
    }

    .button {
      height: 40px;
      border-radius: 6px;
      border: none;
      background: linear-gradient(
        156deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(240, 240, 240, 1) 100%
      );
      padding: 0 30px;
      font-weight: 600;
      flex-shrink: 0;
      font-family: inherit;
      box-shadow:
        0px 0px 0px 1px rgba(0, 0, 0, 0.06),
        0px 1px 0px 0px rgba(0, 0, 0, 0.08),
        0px 2px 2px 0px rgba(0, 0, 0, 0.04),
        0px 3px 3px 0px rgba(0, 0, 0, 0.02),
        0px 4px 4px 0px rgba(0, 0, 0, 0.01);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      text-decoration: none;
      color: hsl(0, 0%, 9%);
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      transition:
        box-shadow 200ms,
        background 200ms;
    }

    .button[data-primary] {
      box-shadow: 0px 0px 0px 1px var(--gray12);
      background: var(--gray12);
      color: var(--gray1);
    }

    .button:focus-visible {
      outline: none;
      box-shadow:
        0px 0px 0px 1px rgba(0, 0, 0, 0.06),
        0px 1px 0px 0px rgba(0, 0, 0, 0.08),
        0px 2px 2px 0px rgba(0, 0, 0, 0.04),
        0px 3px 3px 0px rgba(0, 0, 0, 0.02),
        0px 4px 4px 0px rgba(0, 0, 0, 0.01),
        0 0 0 2px rgba(0, 0, 0, 0.15);
    }

    .button:after {
      content: '';
      position: absolute;
      top: 100%;
      background: blue;
      left: 0;
      width: 100%;
      height: 35%;
      background: linear-gradient(
        to top,
        hsl(0, 0%, 91%) 0%,
        hsla(0, 0%, 91%, 0.987) 8.1%,
        hsla(0, 0%, 91%, 0.951) 15.5%,
        hsla(0, 0%, 91%, 0.896) 22.5%,
        hsla(0, 0%, 91%, 0.825) 29%,
        hsla(0, 0%, 91%, 0.741) 35.3%,
        hsla(0, 0%, 91%, 0.648) 41.2%,
        hsla(0, 0%, 91%, 0.55) 47.1%,
        hsla(0, 0%, 91%, 0.45) 52.9%,
        hsla(0, 0%, 91%, 0.352) 58.8%,
        hsla(0, 0%, 91%, 0.259) 64.7%,
        hsla(0, 0%, 91%, 0.175) 71%,
        hsla(0, 0%, 91%, 0.104) 77.5%,
        hsla(0, 0%, 91%, 0.049) 84.5%,
        hsla(0, 0%, 91%, 0.013) 91.9%,
        hsla(0, 0%, 91%, 0) 100%
      );
      opacity: 0.6;
      transition: transform 200ms;
    }

    .button:hover:not([data-primary]):after {
      transform: translateY(-100%);
    }

    .button[data-primary]:hover {
      background: var(--hover);
    }

    .heading {
      font-size: 48px;
      font-weight: 700;
      margin: -20px 0 12px;
    }

    .wrapper p {
      margin-bottom: 12px;
    }

    @media (max-width: 600px) {
      .toastWrapper {
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly toast = toast;
}
