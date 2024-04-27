import {
    Directive,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';

/* FUENTE:
https://stackoverflow.com/questions/63151191/angular-directive-for-detect-screen-size
*/

type Size = 'mobile' | 'large';

const config = {
    mobile: [Breakpoints.XSmall, Breakpoints.Small],
    large: [Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge],
};

@Directive({
    selector: '[ifViewportSize][if-viewport-size]',
    standalone: true,
})
export class IfViewportSizeDirective {
    #destroyRef = inject(DestroyRef);
    #observer = inject(BreakpointObserver);
    #vcRef = inject(ViewContainerRef);
    #templateRef = inject(TemplateRef<any>);

    @Input('ifViewportSize') set size(value: Size) {
        this.#observer
            .observe(config[value])
            .pipe(
                tap( value => console.log("value: ",value)
                ),
                takeUntilDestroyed(this.#destroyRef))
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
