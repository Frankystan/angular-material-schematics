import { NgStyle } from '@angular/common';
import {
    Component,
    Signal,
    computed,
    effect,
    inject,
    input,
    signal,
} from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { tPost } from '@shared/custom-types/custom.type';
import { SanitizePipe } from '@shared/pipes/sanitize.pipe';
import { DummyDataService } from '@shared/services/dummy-data.service';
import { switchMap, of } from 'rxjs';
import { MomentModule } from 'ngx-moment';
import { I18nService } from '@shared/services/i18n.service';
import { TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { strings as stringsUS } from 'ngx-timeago/language-strings/en';
import { strings as stringsES } from 'ngx-timeago/language-strings/es';
import { FabPageActionComponent } from '@layout/fab-page-action/fab-page-action.component';
import { CustomTimeAgoPipe } from '@shared/pipes/custom-time-ago.pipe';

/*
hay que modificar esto en el archivo: /node_modules/ngx-timeago/timeago.pipe.d.ts

*/

@Component({
    selector: 'app-post-show',
    standalone: true,
    templateUrl: './post-show.component.html',
    styleUrl: './post-show.component.scss',
    imports: [
        CustomTimeAgoPipe,
        FabPageActionComponent,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        MatIconModule,
        MomentModule,
        NgStyle,
        SanitizePipe,
        TimeagoModule,
    ],
})
export class PostShowComponent {
    #dummyDataService = inject(DummyDataService);
    #i18nService = inject(I18nService);
    #timeagoIntl = inject(TimeagoIntl);

    bookmarked = signal<boolean>(false);
    id = input.required<string>();

    post: Signal<tPost> = toSignal(
        toObservable(this.id).pipe(
            switchMap((itemId) => of(this.#dummyDataService.getOne(itemId))),
        ),
    );

    created_at = computed(() => this.post()?.created_at * 1000);

    data = computed(() => {
        return {
            link: '/posts/' + this.id() + '/edit',
            icon: 'edit',
        };
    });

    constructor() {
        effect(
            () => {
                switch (this.#i18nService.language) {
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
            },
            { allowSignalWrites: true },
        );
    }

    ngOnInit() {}

    bookmarkToogle() {
        this.bookmarked.set(!this.bookmarked());
    }
}
