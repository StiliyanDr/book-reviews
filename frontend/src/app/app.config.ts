import { provideHttpClient } from '@angular/common/http';
import {
    APP_INITIALIZER,
    ApplicationConfig,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StaticConfigService, initialiseStaticConfig } from './services/config/static-config.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        {
            provide: APP_INITIALIZER,
            useFactory: initialiseStaticConfig,
            deps: [StaticConfigService],
            multi: true,
        },
    ],
};