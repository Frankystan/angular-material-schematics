import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Input, NgZone, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContent } from '@angular/material/sidenav';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

/*
https://github.com/Frankistan/ng8fireblog/blob/master/src/app/layout/fabs/fab-scroll-to-top.component.ts
*/

@Component({
    selector: 'app-fab-scroll-to-top',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, ScrollingModule],
    templateUrl: './fab-scroll-to-top.component.html',
    styleUrl: './fab-scroll-to-top.component.scss',
})
export class FabScrollToTopComponent {
    #scrollDispatcher = inject(ScrollDispatcher);
    #zone = inject(NgZone);

    @Input() viewport!: MatSidenavContent;

    lastScrollPosition: number = 0;
    offSet: number = 500;

    show = toSignal(
        this.#scrollDispatcher.scrolled().pipe(
            filter((event: any) =>
                (<HTMLElement>event.getElementRef().nativeElement).tagName ===
                'MAT-SIDENAV-CONTENT'
                    ? true
                    : false,
            ),
            map((cdk: any) => {
                let visible = false;
                this.#zone.run(() => {
                    let scroll = cdk.measureScrollOffset('top');

                    switch (true) {
                        case scroll == 0:
                            visible = false;
                            break;

                        case scroll > this.lastScrollPosition:
                            visible = false;
                            break;
                        case this.lastScrollPosition - this.offSet > 0:
                            visible = true;
                            break;

                        default:
                            visible = false;
                            break;
                    }

                    this.lastScrollPosition = scroll;
                });

                return visible;
            }),
            distinctUntilChanged(),
        ),
        { initialValue: false },
    );

    scrollToTop() {
        this.viewport.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
}
