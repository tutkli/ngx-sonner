import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSonner } from 'ngx-sonner';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideSonner({ toastLifetime: 1000000 }),
  ],
};
