import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    Directive,
    Signal,
    TemplateRef,
    ViewContainerRef,
    inject,
    input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/*
https://angular.io/guide/structural-directives
*/

@Directive({
    selector: '[isVisible],[is-visible]',
    standalone: true,
})
export class isVisibleDirective {
    #breakpointObserver = inject(BreakpointObserver);
    #templateRef = inject(TemplateRef<any>);
    #viewContainer = inject(ViewContainerRef);

    #hasView = false;

    isMobile: Signal<boolean> = toSignal(
        this.#breakpointObserver
            .observe(Breakpoints.XSmall)
            .pipe(map((result) => result.matches)),
        { initialValue: false },
    );

    isVisible = input.required({
        transform: (condition: boolean) => {
            console.log(
                'isMobile: ',
                this.isMobile(),
                'hasView: ',
                this.#hasView,
                'condition: ',
                condition,
            );
            // condition = <boolean>condition;
            if (this.isMobile()) {
                if (condition && !this.#hasView) {
                    this.#viewContainer.createEmbeddedView(this.#templateRef);
                    this.#hasView = true;
                } else {
                    this.#viewContainer.clear();
                    this.#hasView = false;
                }
            } else {
                if (condition && !this.#hasView) {
                    this.#viewContainer.createEmbeddedView(this.#templateRef);
                    this.#hasView = true;
                } else {
                    this.#viewContainer.clear();
                    this.#hasView = false;
                }
            }
        },
    });
}
