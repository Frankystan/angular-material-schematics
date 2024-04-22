import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, NgZone, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, filter } from 'rxjs/operators';

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

    offSet: number = 500;
    currentPosition: number = 0;
    lastPosition: number = 0;
    viewport!: HTMLElement;

    visible = toSignal(
        this.#scrollDispatcher.scrolled().pipe(
            filter((event: any) =>
                (<HTMLElement>event.getElementRef().nativeElement).tagName ===
                'MAT-SIDENAV-CONTENT'
                    ? true
                    : false,
            ),
            map((event: any) => event?.getElementRef().nativeElement),
            map((el: HTMLElement) => {
                let show: boolean = false;
                this.viewport = el;
                this.#zone.run(() => {
                    this.currentPosition = el.scrollTop;

                    switch (true) {
                        case this.currentPosition == 0: // TOP
                            show = false;
                            break;
                        case this.currentPosition > this.lastPosition: // DOWN
                            show = false;
                            break;
                        case this.lastPosition - this.offSet >= 0: // UP
                            show = true;
                            break;

                        default:
                            show = false;
                            break;
                    }

                    this.lastPosition = this.currentPosition;
                });
                return show;
            }),
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
