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
import { strings as enUs } from 'ngx-timeago/language-strings/en';
import { strings as esES } from 'ngx-timeago/language-strings/es';
import { FabEditPostComponent } from '@layout/fab-edit-post/fab-edit-post.component';

@Component({
    selector: 'app-post-show',
    standalone: true,
    templateUrl: './post-show.component.html',
    styleUrl: './post-show.component.scss',
    imports: [
        MatCardModule,
        MatIconModule,
        MomentModule,
        MatDividerModule,
        MatChipsModule,
        MatButtonModule,
        SanitizePipe,
        FabEditPostComponent,
        NgStyle,
        TimeagoModule,
    ],
})
export class PostShowComponent {
    #dummyDataService = inject(DummyDataService);
    #i18nService = inject(I18nService);
    intl = inject(TimeagoIntl);

    id = input.required<string>();

    bookmarked = signal<boolean>(false);

    post: Signal<tPost> = toSignal(
        toObservable(this.id).pipe(
            switchMap((itemId) => of(this.#dummyDataService.getOne(itemId))),
        ),
    );

    created_at = signal<number>(0);

    // created_at = computed(()=>{
    //     return (this.post().created_at * 1000);
    // });

    constructor() {
        effect(
            () => {
                this.intl.strings = enUs;
                this.intl.changes.next();
                this.created_at.set(this.post().created_at * 1000);

                console.log('🚀 ~ I18nService ~ getlanguage ~ language:', enUs);
            },
            { allowSignalWrites: true },
        );
    }

    ngOnInit() {}

    bookmarkToogle() {
        this.bookmarked.set(!this.bookmarked());
    }
}
