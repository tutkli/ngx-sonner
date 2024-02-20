import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSonner } from '../../../../libs/ngx-sonner/src/lib/sonner.provider';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideSonner({ toastLifetime: 1000000 }),
  ],
};
