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

    id = input.required<string>();
    locale = signal<string>('es');
    bookmarked = signal<boolean>(false);

    item: Signal<tPost> = toSignal(
        toObservable(this.id).pipe(
            switchMap((itemId) => of(this.#dummyDataService.getOne(itemId))),
        ),
    );





    ngOnInit() {
        // do something with the id
        console.log('🚀 ~ PostShowComponent ~ id:', this.id());
        console.log('🚀 ~ PostShowComponent ~ post:', this.item());
    }

    bookmarkToogle() {
        this.bookmarked.set(!this.bookmarked());
    }
}