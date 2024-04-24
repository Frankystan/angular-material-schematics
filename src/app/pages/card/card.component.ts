import { NgStyle } from '@angular/common';
import { Component, Signal, inject, input, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { tPost } from '@app/custom-types/custom.type';
import { DummyDataService } from '@shared/services/dummy-data.service';
import { FabEditItemComponent } from '@layout/fab-edit-item/fab-edit-item.component';
import { switchMap, of } from 'rxjs';
import { SanitizePipe } from '@shared/pipes/sanitize.pipe';

@Component({
    selector: 'app-card',
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
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
})
export class CardComponent {
    #dummyDataService = inject(DummyDataService);

    bookmarked = signal<boolean>(false);

    id = input.required<string>();

    // item: Signal<tPost> = toSignal(
    // 	toObservable(this.id).pipe(
    // 		switchMap((itemId) => of(this.#dummyDataService.getOne(itemId)))
    // 	),
    // 	{ initialValue: null }
    // );

    item: Signal<tPost> = toSignal(
        toObservable(this.id).pipe(
            switchMap((itemId) => of(this.#dummyDataService.getOne(itemId))),
        ),
    );

    bookmarkToogle() {
        this.bookmarked.set(!this.bookmarked());
    }
}
