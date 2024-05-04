import { PortalHost, DomPortalHost, CdkPortal, Portal } from '@angular/cdk/portal';
import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-actions',
  standalone: true,
  imports: [],
  template: `
  <ng-template cdk-portal>
    <ng-content></ng-content>
  </ng-template>
  `,
  styles: []
})
export class PageActionsComponent implements OnInit, AfterViewInit, OnDestroy {

    private portalHost: PortalHost;
    @ViewChild(CdkPortal) portal: Portal<any>;
  
    constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector,
      private appRef: ApplicationRef
    ) {}
  
    ngOnInit() {}
  
    ngAfterViewInit(): void {
      // Create a portalHost from a DOM element
      this.portalHost = new DomPortalHost(
        document.querySelector('#page-actions-container'),
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );
  
      // Attach portal to host
      this.portalHost.attach(this.portal);
    }
  
    ngOnDestroy(): void {
      this.portalHost.detach();
    }
  }
  