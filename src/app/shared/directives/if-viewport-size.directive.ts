import {
    Directive,
    OnDestroy,
    Input,
    ViewContainerRef,
    TemplateRef,
    DestroyRef,
    inject,
} from '@angular/core';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState,
} from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/*
https://stackblitz.com/edit/angular-ivy-jrtbsa?file=src%2Fapp%2Fif-viewport-size.directive.ts
*/

/*
type Size = "small" | "medium" | "large" ;

const config = {
    small: [Breakpoints.Small, Breakpoints.XSmall],
    medium: [Breakpoints.Medium],
    large: [Breakpoints.Large, Breakpoints.XLarge]    
};
*/

type Size = 'mobile' | 'web';

const config = {
    mobile: [Breakpoints.XSmall, Breakpoints.Small],
    web: [
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
    ],
};

@Directive({
    standalone: true,
    selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective {
    #observer = inject(BreakpointObserver);
    #vcRef = inject(ViewContainerRef);
    #templateRef = inject(TemplateRef<any>);

    #destroyRef = inject(DestroyRef);

    @Input('ifViewportSize') set size(value: Size) {
        this.#observer
            .observe(config[value])
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(this.updateView);
    }

    updateView = ({ matches }: BreakpointState) => {
        if (matches && !this.#vcRef.length) {
            this.#vcRef.createEmbeddedView(this.#templateRef);
        } else if (!matches && this.#vcRef.length) {
            this.#vcRef.clear();
        }
    };
}
