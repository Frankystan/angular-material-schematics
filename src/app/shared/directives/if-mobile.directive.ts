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
import { LayoutService } from '@shared/services/layout.service';
import { map } from 'rxjs/operators';

@Directive({
    selector: '[ifMobile]',
    standalone: true,
})
export class IfMobileDirective {
    #vcRef = inject(ViewContainerRef);
    #templateRef = inject(TemplateRef<any>);

    isMobile: Signal<boolean> = inject(LayoutService).isMobile;

    @Input('ifMobile') set size(value: boolean) {
        this.updateView(value);
    }

    updateView = (matches: boolean) => {
        if (matches) {
            if (this.isMobile() && !this.#vcRef.length) {
                this.#vcRef.createEmbeddedView(this.#templateRef);
            } else if (!matches && this.#vcRef.length) {
                this.#vcRef.clear();
            }
        } else {
            if (!this.isMobile() && !this.#vcRef.length) {
                this.#vcRef.createEmbeddedView(this.#templateRef);
            } else if (this.#vcRef.length) {
                this.#vcRef.clear();
            }
        }
    };
}
