import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    InMemoryScrollingFeature,
    InMemoryScrollingOptions,
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideCustomTitleStrategy } from './providers/custom-title-strategy.provider';
import { provideCustomTranslate } from './providers/custom-translate.provider';
import { provideHttpClient } from '@angular/common/http';
import { provideCustomInitializer } from './providers/custom-initializer.provider';
import { provideCustomTimeago } from './providers/custom-timeago-provider';
import { PortalModule } from '@angular/cdk/portal';

/*
https://stackoverflow.com/questions/76318742/configuring-scroll-restoration-for-angular-standalone-router

https://fireflysemantics.medium.com/turning-on-scrolltop-restoration-for-the-standalone-angular-router-afd98bd8defd

*/

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
    withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideAnimationsAsync(),
        provideRouter(
            APP_ROUTES,
            withComponentInputBinding(),
            inMemoryScrollingFeature,
        ),
        provideCustomTitleStrategy,
        provideCustomTranslate,
        provideCustomInitializer,
        provideCustomTimeago,
        // importProvidersFrom(PortalModule),
    ],
};
