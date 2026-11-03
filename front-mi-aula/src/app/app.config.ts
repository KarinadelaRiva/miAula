import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { tokenInterceptorInterceptor } from './interceptor/token-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptorInterceptor]))
  ]
};
