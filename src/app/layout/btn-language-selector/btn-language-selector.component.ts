import { IfViewportSizeDirective } from '@shared/directives/if-viewport-size.directive';
import { I18nService } from '@shared/services/i18n.service';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { IfViewportMatchDirective } from '@shared/directives/if-viewport-match.directive';

@Component({
    selector: 'btn-language-selector',
    standalone: true,
    imports: [
        TranslateModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        IfViewportSizeDirective,
        IfViewportMatchDirective,
    ],
    templateUrl: './btn-language-selector.component.html',
    styleUrl: './btn-language-selector.component.scss',
})
export class BtnLanguageSelectorComponent {
    private i18nService = inject(I18nService);
    public translate = inject(TranslateService);

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    get currentLanguage(): string {
        return this.i18nService.language;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }
}
