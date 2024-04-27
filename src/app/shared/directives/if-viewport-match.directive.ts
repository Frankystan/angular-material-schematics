import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    Directive,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

/*
https://stackblitz.com/edit/angular-ivy-hzxukn?file=src%2Fapp%2Fif-viewport-match.directive.ts
*/

type BreakpointSizes =
    | 'XSmall'
    | 'Small'
    | 'Medium'
    | 'Large'
    | 'XLarge'
    | 'Desktop'
    | `(${'max-width' | 'min-width'}: ${number}px)`;

const sizes = new Map([
    ['XSmall', Breakpoints.XSmall],
    ['Small', Breakpoints.Small],
    ['Medium', Breakpoints.Medium],
    ['Large', Breakpoints.Large],
    ['XLarge', Breakpoints.XLarge],
    ['Desktop', '(min-width: 960px)'],
]);

@Directive({
    standalone: true,
    selector: '[appIfViewportMatch]',
})
export class IfViewportMatchDirective implements OnDestroy {
    private subscription!: Subscription;
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private bpObserver: BreakpointObserver,
    ) {}

    @Input() set appIfViewportMatch(mq: BreakpointSizes) {
        if (this.subscription) return;
        const size = sizes.get(mq);
        console.log(size);

        this.subscription = this.bpObserver
            .observe(size || mq)
            .subscribe(({ matches }) => {
                this.render(matches);
            });
    }

    ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }

    private render(matches: boolean) {
        console.log(matches);

        if (!this.hasView && matches) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
