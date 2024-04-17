import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BtnProfileComponent } from '@layout/btn-profile/btn-profile.component';
import { Component, HostListener, Signal, inject, viewChild } from '@angular/core';
import { FabScrollToTopComponent } from '@layout/fab-scroll-to-top/fab-scroll-to-top.component';
import { map, tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SidenavBodyComponent } from '@layout/sidenav-body/sidenav-body.component';
import { SidenavHeaderComponent } from '@layout/sidenav-header/sidenav-header.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgStyle } from '@angular/common';

/*
Scrolling
https://stackoverflow.com/questions/47528852/angular-material-sidenav-cdkscrollable/50812763#50812763

https://stackblitz.com/edit/sidenavcontainer-scrollable-elementscrolled-1?file=src%2Fapp%2Fapp.component.ts



PORTALS
TOOLBAR WITH PAGE ACTION PORTALS
https://juri.dev/blog/2018/05/dynamic-ui-with-cdk-portals/

DISABLE SCROLL WHEN SIDENAV IS OPENED
https://medium.com/@nikhil_gupta/how-to-disable-background-scroll-when-a-modal-side-drawer-is-open-in-react-js-999653a8eebb

he copiado esta linea en consola y funciona:
  document.body.style.overflow = 'hidden';

*/
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        SidenavBodyComponent,
        SidenavHeaderComponent,
        RouterModule,
        FabScrollToTopComponent,
        BtnProfileComponent,
        NgStyle ,
    ],
})
export class NavigationComponent {
    #breakpointObserver = inject(BreakpointObserver);

    onSideNavScroll(event:any){ event.stopPropagation() }

    drawer: Signal<MatSidenav | undefined> = viewChild('drawer');

  

    isMobile: Signal<boolean> = toSignal(
        this.#breakpointObserver
            .observe(Breakpoints.XSmall)
            .pipe(
                map((result) => result.matches)
            ),
        { initialValue: false },
    );

    close() {
        if (this.isMobile()) this.drawer()?.close();
    }

    drawerToggle(){

        this.drawer()?.opened ? document.body.style.overflow = 'unset' : document.body.style.overflow = 'hidden';

        
        this.drawer()?.toggle();
    }

}
