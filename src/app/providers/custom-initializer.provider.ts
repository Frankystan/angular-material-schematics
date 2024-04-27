import { APP_INITIALIZER, DestroyRef, Provider } from '@angular/core';

import { environment } from '@env/environment.development';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@shared/services/i18n.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomTitleStrategyService } from '@shared/services/custom-title-strategy.service';

function initializeApp(
    translateService: TranslateService,
    i18nService: I18nService,
    router: Router,
    ctitles: CustomTitleStrategyService,
    destroyRef: DestroyRef,
) {
    return () => {
        // Setup translations
        i18nService.init(
            environment.defaultLanguage,
            environment.supportedLanguages,
        );

        // set Translated Page Title on route languague changes
        translateService.onLangChange
            .pipe(
                map((_) => router.routerState.snapshot),
                takeUntilDestroyed(destroyRef),
            )
            .subscribe((snapshot) => {
                ctitles.updateTitle(snapshot);
            });

        // OPCION 2
        /*
		merge(
			translateService.onLangChange,
			router.events.pipe(
				filter((event) => event instanceof NavigationEnd)
			)
		)
			.pipe(
				map((_) => router.routerState.snapshot),
				takeUntilDestroyed(destroyRef)
			)
			.subscribe((snapshot) => {
				ctitles.updateTitle(snapshot);
			});
		*/
    };
}

export const provideCustomInitializer: Provider = {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [
        TranslateService,
        I18nService,
        Router,
        CustomTitleStrategyService,
        DestroyRef,
    ],
    multi: true,
};
