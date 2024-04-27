import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/* 
https://itnext.io/manage-angular-page-titles-translation-d1384bbede86
https://github.com/ngx-translate/core/issues/894
*/

@Injectable({
    providedIn: 'root',
})
export class CustomTitleStrategyService extends TitleStrategy {
    #title = inject(Title);
    #translateService = inject(TranslateService);

    updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot) || '';

        if (title) {
            this.#translateService.get(title).subscribe((translatedTitle) => {
                this.#title.setTitle(`AMS by Fran | ${translatedTitle}`);
            });
        } else {
            // this.title.setTitle('DEFAULT_TITLE');
            this.#title.setTitle('AMS by Fran');
        }
    }
}
