import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import {
    Component,
    Input,
    Signal,
    effect,
    inject,
    signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, fromEvent, of } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-fab-scroll-to-top',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, ScrollingModule],
    template: `
        @if (isVisibe) {
            <button
                mat-mini-fab
                class="bottom-right"
                color="primary"
                aria-label="Scroll to top button"
                (click)="scrollToTop()"
            >
                <mat-icon>arrow_upward</mat-icon>
            </button>
        }
    `,
    styles: [
        `
            .bottom-right {
                bottom: 5.5rem;
                cursor: pointer;
                float: right;
                left: auto;
                opacity: 0.7;
                position: fixed;
                right: 1.5rem;
                z-index: 1;
            }
        `,
    ],
})
export class FabScrollToTopComponent {
    #scrollDispatcher = inject(ScrollDispatcher);

    private readonly vScroller = inject(ViewportScroller);

    show = signal(false);

    offSet: number = 300;
    lastPosition: number = 0;
    currentPosition: number = 0;
    isVisibe: boolean = false;

    constructor() {
        effect(() => {
            this.isVisibe = this.visible();
        });
    }

    viewport: Signal<HTMLElement | undefined> = toSignal(
        this.#scrollDispatcher.scrolled().pipe(
            map((event: any) => event.getElementRef().nativeElement),
            distinctUntilChanged(),
        ),
    );

    visible = toSignal(
        this.#scrollDispatcher.scrolled().pipe(
            map((event: any) => event.getElementRef().nativeElement),
            map((el: HTMLElement) => {
                this.currentPosition = el.scrollTop;
                let show: boolean = false;

                switch (true) {
                    case this.currentPosition == 0: // TOP
                        show= false;
                        break;
                    case this.currentPosition > this.lastPosition: // DOWN
                        show= false;
                        break;
                    case this.lastPosition - this.offSet >= 0: // UP
                       show= true;
                        break;

                    default:
                        show= false;
                        break;
                }

                this.lastPosition = this.currentPosition;

                return show;
            }),
        ),
        { initialValue: false },
    );

    scrollToTop() {
        this.viewport()?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
}
