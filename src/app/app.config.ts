import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { APP_ROUTES } from './app.routes';


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
        provideAnimationsAsync(),
        provideRouter(APP_ROUTES, withComponentInputBinding(), inMemoryScrollingFeature)
    ],
};
