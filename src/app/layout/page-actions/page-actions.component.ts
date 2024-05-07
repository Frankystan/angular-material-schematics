import { CdkPortal, DomPortalOutlet, PortalModule } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ApplicationRef,
    Component,
    ComponentFactoryResolver,
    Injector,
    OnDestroy,
    inject,
    viewChild,
} from '@angular/core';

/*
idea original - CON "ComponentFactoryResolver"
https://juri.dev/blog/2018/05/dynamic-ui-with-cdk-portals/
https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/
https://stackblitz.com/github/juristr/demo-cdk-portal-mobile-pageactions?file=src%2Fapp%2Fshared%2Fpage-actions%2Fpage-actions.component.ts

DE AQUI TENGO LA IDEA DEL PORTALBRIDGE - elimino el uso del "ComponentFactoryResolver"
https://stackblitz.com/edit/angular-ivy-phqryn?file=src%2Fapp%2Fportal-outlet%2Fportal-outlet.component.ts
https://youtu.be/wPjVWeXSdqU?si=uW3ocIek6lizW09y

ver esta alternativa -  SIN "ComponentFactoryResolver" 
https://medium.com/angular-in-depth/how-do-cdk-portals-work-7c097c14a494
https://stackblitz.com/github/juristr/demo-cdk-portal-mobile-pageactions/tree/self-made-portals?ctl=1&embed=1

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
    #cfr = inject(ComponentFactoryResolver);
    #appRef = inject(ApplicationRef);
    #injector = inject(Injector);

    portal = viewChild.required<CdkPortal>(CdkPortal);
    host!: DomPortalOutlet;
    elemnt: Element = document.querySelector(
        '#toolbar-portal-outlet',
    ) as Element;

    ngAfterViewInit(): void {
        this.host = new DomPortalOutlet(
            this.elemnt,
            this.#cfr,
            this.#appRef,
            this.#injector,
        );
        this.host.attach(this.portal());
    }

    ngOnDestroy(): void {
        this.host.detach();
    }
}
