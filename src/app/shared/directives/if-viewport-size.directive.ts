import {
    Directive,
    OnDestroy,
    Input,
    ViewContainerRef,
    TemplateRef
} from "@angular/core";
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from "@angular/cdk/layout";
import { Subscription } from "rxjs";

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

type Size = "mobile" | "web";

const config = {
    mobile: [Breakpoints.XSmall, Breakpoints.Small],
    web: [Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge, Breakpoints.Handset]
};

@Directive({
    standalone: true,
    selector: "[ifViewportSize]"
})
export class IfViewportSizeDirective implements OnDestroy {
    private subscription = new Subscription();

    @Input("ifViewportSize") set size(value: Size) {
        this.subscription.unsubscribe();
        this.subscription = this.observer
            .observe(config[value])
            .subscribe(this.updateView);
    }

    constructor(
        private observer: BreakpointObserver,
        private vcRef: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) { }

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
