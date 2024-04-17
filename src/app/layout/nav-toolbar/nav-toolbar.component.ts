import { NgStyle } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
    MatDrawer,
    MatSidenav,
    MatSidenavModule,
} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BtnProfileComponent } from '@layout/btn-profile/btn-profile.component';
import { FabScrollToTopComponent } from '@layout/fab-scroll-to-top/fab-scroll-to-top.component';
import { SidenavBodyComponent } from '@layout/sidenav-body/sidenav-body.component';
import { SidenavHeaderComponent } from '@layout/sidenav-header/sidenav-header.component';

/*
**OPCIONAL**
DISABLE SCROLL WHEN SIDENAV IS OPENED
https://medium.com/@nikhil_gupta/how-to-disable-background-scroll-when-a-modal-side-drawer-is-open-in-react-js-999653a8eebb

he copiado esta linea en consola y funciona:
  document.body.style.overflow = 'hidden';
*/

@Component({
    selector: 'app-nav-toolbar',
    standalone: true,
    imports: [
        BtnProfileComponent,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
    ],
    templateUrl: './nav-toolbar.component.html',
    styleUrl: './nav-toolbar.component.scss',
})
export class NavToolbarComponent {
    @Input() isMobile!: boolean;
    @Input() drawer!: MatDrawer;

    // DISABLE SCROLL WHEN MAT-SIDENAV is opened
    // drawerToggle() {
    //     this.drawer?.opened
    //         ? (document.body.style.overflow = 'unset')
    //         : (document.body.style.overflow = 'hidden');

    //     this.drawer?.toggle();
    // }
}
