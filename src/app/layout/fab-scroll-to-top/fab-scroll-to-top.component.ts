import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, fromEvent, of } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-fab-scroll-to-top',
    standalone: true,
    imports: [MatIconModule, MatButtonModule,ScrollingModule],
    template: `


        <button
            mat-mini-fab
            class="bottom-right"
            color="primary"
            aria-label="Scroll to top button"
            (click)="scrollToTop()"	>
        <mat-icon>arrow_upward</mat-icon>
        </button>
    
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
    // visible= signal(false);

    viewport: Signal<HTMLElement | undefined> = toSignal(
        this.#scrollDispatcher.scrolled().pipe(
            map((event: any) => event.getElementRef().nativeElement),
            tap((el: HTMLElement) => {
                this.currentPosition = el.scrollTop;

                switch (true) {
                    case this.currentPosition == 0: // TOP
                        this.show.set(false);
                        break;
                    case this.currentPosition > this.lastPosition: // DOWN
                        this.show.set(false);
                        break;
                    case (this.lastPosition - this.offSet) >= 0: // UP
                        this.show.set(true);
                        break;

                    default:
                        this.show.set(false);
                        break;
                }

                // console.log("visible: ", this.visible(), "current: ", this.currentPosition, "diff:", this.lastPosition - this.offSet);
                // console.log("current: ",this.currentPosition,"last: ",this.lastPosition,"diff:",this.lastPosition - this.offSet);

                this.lastPosition = this.currentPosition;
                console.log("show: ",this.show());
                
            }),
            distinctUntilChanged(),
            
        )
    );


    visible:Signal<boolean> = toSignal(
        this.#scrollDispatcher.scrolled().pipe(
            map((event: any) => event.getElementRef().nativeElement),
            map((el: HTMLElement) => {
                this.currentPosition = el.scrollTop;
                let visible:boolean = false;

                switch (true) {
                    case this.currentPosition == 0: // TOP
                        visible = false;
                        break;
                    case this.currentPosition > this.lastPosition: // DOWN
                        visible = false;
                        break;
                    case (this.lastPosition - this.offSet) >= 0: // UP
                        visible = true;
                        break;

                    default:
                        visible = false;
                        break;
                }

                // console.log("visible: ", this.visible(), "current: ", this.currentPosition, "diff:", this.lastPosition - this.offSet);
                // console.log("current: ",this.currentPosition,"last: ",this.lastPosition,"diff:",this.lastPosition - this.offSet);


                this.lastPosition = this.currentPosition;

                
                return visible;
            })
        )
    ,{initialValue:false});

    scrollToTop() {
        this.viewport()?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }






    //   private readonly document = inject(DOCUMENT);
    //   private readonly viewport = inject(ViewportScroller);

    //   readonly showScroll$: Observable<boolean> = of(
    //     this.document,
    //     'scroll'
    //   ).pipe(
    //     tap(_ => console.log("position: ",this.viewport.getScrollPosition())),
    //     map(() => this.viewport.getScrollPosition()?.[1] > 0)
    //   );

    //   scrollToTop(): void {
    //     this.viewport.scrollToPosition([0, 0]);
    //   }
}
