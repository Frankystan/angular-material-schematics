import {
    BreakpointObserver,
    BreakpointState,
    Breakpoints,
    MediaMatcher,
} from '@angular/cdk/layout';
import {
    Component,
    DestroyRef,
    Input,
    OnInit,
    Signal,
    inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MatGridListModule } from '@angular/material/grid-list';
import { faker } from '@faker-js/faker/locale/es';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

/*
mi ejemplo:
https://github.com/Frankistan/ng11fireblog/tree/master/src/app/components/posts/post-list/post-grid-view


https://www.thisdot.co/blog/how-to-manage-breakpoints-using-breakpointobserver-in-angular
https://stackblitz.com/edit/breakpointobserver-angular?file=src%2Fapp%2Fhome%2Fhome.component.ts


https://material.angular.io/cdk/layout/overview

*/

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [MatGridListModule],
    templateUrl: './grid.component.html',
    styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit {
    #destroyRef = inject(DestroyRef);
    #breakpointObserver = inject(BreakpointObserver);

    grid = [
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
    ];

    cols = new Map([
        [Breakpoints.XSmall, 1],
        [Breakpoints.Small, 1],
        [Breakpoints.Medium, 2],
        [Breakpoints.Large, 3],
        [Breakpoints.XLarge, 4],
    ]);

    rowHeight: string = '240px';

    columns: Signal<number> = toSignal(
        this.#breakpointObserver.observe(this.grid).pipe(
            map((result) => {
                switch (true) {
                    case this.#breakpointObserver.isMatched(Breakpoints.XSmall):
                        return this.cols.get(Breakpoints.XSmall) as number;

                    case this.#breakpointObserver.isMatched(Breakpoints.Small):
                        return this.cols.get(Breakpoints.Small) as number;

                    case this.#breakpointObserver.isMatched(Breakpoints.Medium):
                        return this.cols.get(Breakpoints.Medium) as number;

                    case this.#breakpointObserver.isMatched(Breakpoints.Large):
                        return this.cols.get(Breakpoints.Large) as number;

                    default:
                        return 4;
                }
            }),
            takeUntilDestroyed(this.#destroyRef),
        ),
        { initialValue: 0 },
    );

    // DUMMY DATA
    items: Array<any> = Array.from({ length: 100 }).map((value, i) => {
        return {
            id: `${i + 1}`,
            title: `${i + 1} - ${faker.lorem.paragraph(1)}`,
            author: {
                displayName: faker.person.fullName(),
                uid: faker.string.uuid(),
            },
            created_at: faker.date.anytime().toLocaleDateString(),
            content: faker.lorem.paragraph(3),
            image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
        };
    });

    ngOnInit(): void {}
}
