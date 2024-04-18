import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass, NgStyle } from '@angular/common';
import { Component, Signal, ViewChild, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BtnProfileComponent } from '@layout/btn-profile/btn-profile.component';
import { FabScrollToTopComponent } from '@layout/fab-scroll-to-top/fab-scroll-to-top.component';
import { NavToolbarComponent } from '@layout/nav-toolbar/nav-toolbar.component';
import { SidenavBodyComponent } from '@layout/sidenav-body/sidenav-body.component';
import { SidenavHeaderComponent } from '@layout/sidenav-header/sidenav-header.component';
import { map } from 'rxjs';
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
        RouterModule,
        NavToolbarComponent,
        MatSidenavModule,
        SidenavBodyComponent,
        SidenavHeaderComponent,
        NgClass,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    #breakpointObserver = inject(BreakpointObserver);

    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
    // drawer: Signal<MatSidenav | undefined> = viewChild('drawer');

    isMobile: Signal<boolean> = toSignal(
        this.#breakpointObserver
            .observe(Breakpoints.XSmall)
            .pipe(map((result) => result.matches)),
        { initialValue: false },
    );

    close() {
        if (this.isMobile()) this.drawer.close();
    }
}
