import { Component, Signal, ViewChild, inject } from '@angular/core';
import { FabScrollToTopComponent } from '@layout/fab-scroll-to-top/fab-scroll-to-top.component';
import { IfMobileDirective } from '@shared/directives/if-mobile.directive';
import { IfViewportMatchDirective } from '@shared/directives/if-viewport-match.directive';
import { IfViewportSizeDirective } from '@shared/directives/if-viewport-size.directive';
import { LayoutService } from './shared/services/layout.service';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NavToolbarComponent } from '@layout/nav-toolbar/nav-toolbar.component';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavBodyComponent } from '@layout/sidenav-body/sidenav-body.component';
import { SidenavHeaderComponent } from '@layout/sidenav-header/sidenav-header.component';

/*
Scrolling
https://stackoverflow.com/questions/47528852/angular-material-sidenav-cdkscrollable/50812763#50812763

https://stackblitz.com/edit/sidenavcontainer-scrollable-elementscrolled-1?file=src%2Fapp%2Fapp.component.ts



PORTALS
TOOLBAR WITH PAGE ACTION PORTALS
https://juri.dev/blog/2018/05/dynamic-ui-with-cdk-portals/


*/

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        FabScrollToTopComponent,
        IfMobileDirective,
        IfViewportMatchDirective,
        IfViewportSizeDirective,
        MatSidenavModule,
        NavToolbarComponent,
        NgClass,
        RouterModule,
        SidenavBodyComponent,
        SidenavHeaderComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    #layoutService = inject(LayoutService);
    isMobile: Signal<boolean> = this.#layoutService.isMobile;

    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

    // drawer: Signal<MatDrawer | undefined> = viewChild('drawer');

    close() {
        if (this.isMobile()) this.drawer.close();
    }
}
