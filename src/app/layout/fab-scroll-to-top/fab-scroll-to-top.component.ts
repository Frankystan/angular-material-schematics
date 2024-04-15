import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Signal, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-fab-scroll-to-top',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ScrollingModule],
  templateUrl: './fab-scroll-to-top.component.html',
  styleUrl: './fab-scroll-to-top.component.scss'
})
export class FabScrollToTopComponent {

    #scrollDispatcher = inject(ScrollDispatcher);

    offSet: number = 300;
    lastPosition: number = 0;
    currentPosition: number = 0;
    isVisible: boolean = false;

    constructor() {
        effect(() => {
            this.isVisible = this.visible();
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
