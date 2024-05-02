import { DestroyRef, Injectable, inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TimeagoIntl } from 'ngx-timeago';

import enUS from '@assets/languages/en-US.json';
import esES from '@assets/languages/es-ES.json';

import { strings as stringsUS } from 'ngx-timeago/language-strings/en';
import { strings as stringsES } from 'ngx-timeago/language-strings/es';

const languageKey = 'language';

@Injectable({
    providedIn: 'root',
})
export class I18nService {
    #destroyRef = inject(DestroyRef);
    #translateService = inject(TranslateService);
    #timeagoIntl = inject(TimeagoIntl);

    defaultLanguage!: string;
    supportedLanguages!: string[];

    constructor() {
        // Embed languages to avoid extra HTTP requests
        this.#translateService.setTranslation('en-US', enUS);
        this.#translateService.setTranslation('es-ES', esES);
    }

    /**
     * Initializes i18n for the application.
     * Loads language from local storage if present, or sets default language.
     * @param defaultLanguage The default language to use.
     * @param supportedLanguages The list of supported languages.
     */
    init(defaultLanguage: string, supportedLanguages: string[]) {
        this.defaultLanguage = defaultLanguage;
        this.supportedLanguages = supportedLanguages;
        this.language = '';

        // Warning: this subscription will always be alive for the app's lifetime
        this.#translateService.onLangChange
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe((event: LangChangeEvent) => {
                switch (event.lang) {
                    case 'es-ES':
                        this.#timeagoIntl.strings = stringsES;
                        break;
                    case 'en-US':
                        this.#timeagoIntl.strings = stringsUS;
                        break;

                    default:
                        this.#timeagoIntl.strings = stringsUS;
                        break;
                }
                this.#timeagoIntl.changes.next();
                localStorage.setItem(languageKey, event.lang);
            });
    }

    /**
     * Sets the current language.
     * Note: The current language is saved to the local storage.
     * If no parameter is specified, the language is loaded from local storage (if present).
     * @param language The IETF language code to set.
     */
    set language(language: string) {
        let newLanguage =
            language ||
            localStorage.getItem(languageKey) ||
            this.#translateService.getBrowserCultureLang() ||
            '';
        let isSupportedLanguage = this.supportedLanguages.includes(newLanguage);

        // If no exact match is found, search without the region
        if (newLanguage && !isSupportedLanguage) {
            newLanguage = newLanguage.split('-')[0];
            newLanguage =
                this.supportedLanguages.find((supportedLanguage) =>
                    supportedLanguage.startsWith(newLanguage),
                ) || '';
            isSupportedLanguage = Boolean(newLanguage);
        }

        // Fallback if language is not supported
        if (!newLanguage || !isSupportedLanguage) {
            newLanguage = this.defaultLanguage;
        }

        language = newLanguage;

        console.debug(`Language set to ${language}`);

        this.#translateService.use(language);
    }

    /**
     * Gets the current language.
     * @return The current language code.
     */
    get language(): string {
        return this.#translateService.currentLang;
    }
}
