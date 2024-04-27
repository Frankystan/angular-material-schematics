import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/languages/', '.json');
}

export const provideCustomTranslate: EnvironmentProviders = importProvidersFrom(
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
        },
    }),
);
