import { NgStyle } from '@angular/common';
import { Component, Signal, inject, input, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { tPost } from '@shared/custom-types/custom.type';
import { FabEditItemComponent } from '@layout/fab-edit-item/fab-edit-item.component';
import { SanitizePipe } from '@shared/pipes/sanitize.pipe';
import { DummyDataService } from '@shared/services/dummy-data.service';
import { switchMap, of } from 'rxjs';
import { MomentModule } from 'ngx-moment';
import { I18nService } from '@shared/services/i18n.service';

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
        FabEditItemComponent,
        NgStyle,
    ],
})
export class PostShowComponent {
    #dummyDataService = inject(DummyDataService);
    #i18nService = inject(I18nService);

    id = input.required<string>();
    // locale = signal<string>('es');
    locale!: string;
    bookmarked = signal<boolean>(false);

    post: Signal<tPost> = toSignal(
        toObservable(this.id).pipe(
            switchMap((itemId) => of(this.#dummyDataService.getOne(itemId))),
        ),
    );

    ngOnInit() {
        this.locale = this.#i18nService.language;
    }

    bookmarkToogle() {
        this.bookmarked.set(!this.bookmarked());
    }
}
