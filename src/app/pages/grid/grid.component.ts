import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatGridListModule } from '@angular/material/grid-list';
import { faker } from '@faker-js/faker/locale/es';

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
    #screen = inject(MediaObserver);

    #breakpointObserver = inject(BreakpointObserver);

    // @Input('data') data: Post[] = [];

    // DUMMY DATA
    data: Array<any> = Array.from({ length: 100 }).map((value, i) => {
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

    rowHeight: string = '240px';
    cols$!: Observable<number>;

    ngOnInit(): void {
        this.setGrid();
    }

    setGrid() {
        let start: number;

        const grid = new Map([
            ['xs', 2],
            ['sm', 2],
            ['md', 3],
            ['lg', 4],
            ['xl', 5],
        ]);

        grid.forEach((cols, mqAlias) => {
            if (this.screen.isActive(mqAlias)) {
                start = cols;
            }
        });
        this.cols$ = this.screen.media$.pipe(
            map((change) => {
                // console.log(change);
                // console.log(grid.get(change.mqAlias));
                return grid.get(change.mqAlias);
            }),
            startWith(start),
        );
    }

    setGrid2() {
        // https://youtu.be/w9InzT-SdIE?t=6m20s
        this.cols$ = this.screen.media$.pipe(
            map((change: MediaChange) => {
                let cols = 0;
                switch (change.mqAlias) {
                    case 'xs':
                        cols = 2; // 'screen and (max-width: 599px)'
                        break;
                    case 'sm':
                        cols = 3; // 'screen and (min-width: 600px) and (max-width: 959px)'
                        break;
                    case 'md':
                        cols = 3; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                        break;
                    case 'lg':
                        cols = 4; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                        break;
                }
                return cols;
            }),
        );
    }

    trackByIdx(i) {
        return i;
    }
}
