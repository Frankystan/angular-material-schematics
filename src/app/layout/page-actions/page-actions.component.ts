import {
    Component,
    AfterViewInit,
    ComponentFactoryResolver,
    Injector,
    ApplicationRef,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { CdkPortal, DomPortalOutlet, PortalModule } from '@angular/cdk/portal';

/*
version 1
https://medium.com/angular-in-depth/how-do-cdk-portals-work-7c097c14a494
https://stackblitz.com/github/juristr/demo-cdk-portal-mobile-pageactions/tree/self-made-portals?ctl=1&embed=1

version 2
https://juri.dev/blog/2018/05/dynamic-ui-with-cdk-portals/
https://stackblitz.com/github/juristr/demo-cdk-portal-mobile-pageactions?file=README.md

https://www.decodedfrontend.io/how-to-provide-data-to-component-portal-using-dependency-injection/
*/

@Component({
    selector: 'app-page-actions',
    standalone: true,
    imports: [PortalModule],
    template: `
        <ng-template cdkPortal>
            <ng-content></ng-content>
        </ng-template>
    `,
    styles: [],
})
export class PageActionsComponent implements AfterViewInit, OnDestroy {
    @ViewChild(CdkPortal) private portal: CdkPortal;

    host: DomPortalOutlet;

    constructor(
        private cfr: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
    ) {}

    ngAfterViewInit(): void {
        this.host = new DomPortalOutlet(
            document.querySelector('#action'),
            this.cfr,
            this.appRef,
            this.injector,
        );

        this.host.attach(this.portal);
    }

    ngOnDestroy(): void {
        this.host.detach();
    }
}
