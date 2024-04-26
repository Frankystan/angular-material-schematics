import {
    Directive,
    OnDestroy,
    Input,
    ViewContainerRef,
    TemplateRef,
} from '@angular/core';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState,
} from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

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
export class IfViewportSizeDirective implements OnDestroy {
    private subscription = new Subscription();

    @Input('ifViewportSize') set size(value: Size) {
        this.subscription.unsubscribe();
        this.subscription = this.observer
            .observe(config[value])
            .subscribe(this.updateView);
    }

    constructor(
        private observer: BreakpointObserver,
        private vcRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
    ) {}

    updateView = ({ matches }: BreakpointState) => {
        if (matches && !this.vcRef.length) {
            this.vcRef.createEmbeddedView(this.templateRef);
        } else if (!matches && this.vcRef.length) {
            this.vcRef.clear();
        }
    };

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
