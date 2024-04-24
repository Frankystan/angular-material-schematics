import { NgStyle } from '@angular/common';
import { Component, Signal, inject, input, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { tPost } from '@app/custom-types/custom.type';
import { FabEditItemComponent } from '@layout/fab-edit-item/fab-edit-item.component';
import { SanitizePipe } from '@shared/pipes/sanitize.pipe';
import { DummyDataService } from '@shared/services/dummy-data.service';
import { switchMap, of } from 'rxjs';

@Component({
    selector: 'app-post-show',
    standalone: true,
    imports: [
        MatChipsModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        FabEditItemComponent,
        NgStyle,
        SanitizePipe,
    ],
    templateUrl: './post-show.component.html',
    styleUrl: './post-show.component.scss',
})
export class PostShowComponent {
    #dummyDataService = inject(DummyDataService);

    bookmarked = signal<boolean>(false);

    id = input.required<string>();

    item: Signal<tPost> = toSignal(
        toObservable(this.id).pipe(
            switchMap((itemId) => of(this.#dummyDataService.getOne(itemId))),
        ),
    );

    bookmarkToogle() {
        this.bookmarked.set(!this.bookmarked());
    }
}
