import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    Directive,
    Input,
    Signal,
    TemplateRef,
    ViewContainerRef,
    inject,
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
export class IsVisibleDirective {
    #breakpointObserver = inject(BreakpointObserver);
    #templateRef = inject(TemplateRef<any>);
    #viewContainer = inject(ViewContainerRef);

    isMobile: Signal<boolean> = toSignal(
        this.#breakpointObserver
            .observe(Breakpoints.XSmall)
            .pipe(map((result) => result.matches)),
        { initialValue: false },
    );

    private hasView = false;

    constructor() {}

    @Input() set isVisible(condition: boolean) {
        if (condition && !this.hasView) {
            this.#viewContainer.createEmbeddedView(this.#templateRef);
            this.hasView = true;
        } else {
            this.#viewContainer.clear();
            this.hasView = false;
        }
    }
}
