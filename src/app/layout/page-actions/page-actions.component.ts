import {
    Component,
    OnInit,
    AfterViewInit,
    ComponentFactoryResolver,
    Injector,
    ViewContainerRef,
    ApplicationRef,
    ViewChild,
    OnDestroy,
    ElementRef
} from '@angular/core';
import {
    DomPortalHost,
    TemplatePortal,
    PortalHost,
    CdkPortal,
    PortalOutlet,
    DomPortalOutlet,
    PortalModule,
    

} from '@angular/cdk/portal';

@Component({
    selector: 'app-page-actions',
    standalone: true,
    imports: [PortalModule],
    template: `
    <ng-template cdkPortal>
        <ng-content></ng-content>
    </ng-template>
  `,
    styles: []
})
export class PageActionsComponent implements AfterViewInit, OnDestroy {
    @ViewChild(CdkPortal) portal: CdkPortal;
    // @ViewChild(CdkPortal) private portal: CdkPortal;


    host: DomPortalOutlet;

    constructor(
        private cfr: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    ngAfterViewInit(): void {
        this.host = new DomPortalOutlet(
            document.querySelector('#action'),
            this.cfr,
            this.appRef,
            this.injector
        );



        this.host.attach(this.portal);
    }

    ngOnDestroy(): void {
        this.host.detach();
    }
}
