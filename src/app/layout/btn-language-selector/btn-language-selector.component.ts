import { I18nService } from '@shared/services/i18n.service';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { IfMobileDirective } from '@shared/directives/if-mobile.directive';

@Component({
    selector: 'btn-language-selector',
    standalone: true,
    imports: [
        TranslateModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        IfMobileDirective,
    ],
    templateUrl: './btn-language-selector.component.html',
    styleUrl: './btn-language-selector.component.scss',
})
export class BtnLanguageSelectorComponent {
    #i18nService = inject(I18nService);
    translate = inject(TranslateService);

    setLanguage(language: string) {
        this.#i18nService.language = language;
    }

    get currentLanguage(): string {
        return this.#i18nService.language;
    }

    get languages(): string[] {
        return this.#i18nService.supportedLanguages;
    }
}
