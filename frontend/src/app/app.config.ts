import { provideHttpClient } from '@angular/common/http';
import {
    APP_INITIALIZER,
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StaticConfigService, initialiseStaticConfig } from './services/config/static-config.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        importProvidersFrom(MatDialogModule),
        {
            provide: APP_INITIALIZER,
            useFactory: initialiseStaticConfig,
            deps: [StaticConfigService],
            multi: true,
        },
    ],
};