import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
<<<<<<< HEAD
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
=======
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptor/error-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadInterceptor } from './core/interceptor/load-interceptor';
import { headerInterceptor } from './core/interceptor/header-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions(),
<<<<<<< HEAD
      withHashLocation(),
=======
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
    ),
    provideClientHydration(withEventReplay()),
    provideToastr(),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerInterceptor, errorInterceptor, loadInterceptor]),
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    importProvidersFrom(NgxSpinnerModule),
  ],
};
