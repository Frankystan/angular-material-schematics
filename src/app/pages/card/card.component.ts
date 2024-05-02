import { NgStyle } from '@angular/common';
import {
    Component,
    Input,
    OnInit,
    Signal,
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
import { DummyDataService } from '@shared/services/dummy-data.service';
import { switchMap, of } from 'rxjs';
import { SanitizePipe } from '@shared/pipes/sanitize.pipe';
import { FabEditPostComponent } from '@layout/fab-edit-post/fab-edit-post.component';

/*
https://www.youtube.com/watch?v=DGk6rjD3AG0&t=456s
*/

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        MatChipsModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        FabEditPostComponent,
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

    item: Signal<tPost> = toSignal(
        toObservable(this.id).pipe(
            switchMap((itemId) => of(this.#dummyDataService.getOne(itemId))),
        ),
    );

    // OPCION 1 - con ngOnInit----------------
    // @Input('id') id!: string;
    // item!: tPost;

    // ngOnInit() {
    //     this.item = this.#dummyDataService.getOne(this.id);
    // }

    bookmarkToogle() {
        this.bookmarked.set(!this.bookmarked());
    }
}
