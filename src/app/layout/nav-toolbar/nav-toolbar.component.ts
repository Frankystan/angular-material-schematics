import { Component, Input, Signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutService } from '@shared/services/layout.service';
import { BtnProfileComponent } from '@layout/btn-profile/btn-profile.component';
import { BtnLanguageSelectorComponent } from '@layout/btn-language-selector/btn-language-selector.component';
import { IfViewportMatchDirective } from '@shared/directives/if-viewport-match.directive';
import { IfViewportSizeDirective } from '@shared/directives/if-viewport-size.directive';

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
        BtnLanguageSelectorComponent,
        IfViewportMatchDirective,
        IfViewportSizeDirective,
    ],
    templateUrl: './nav-toolbar.component.html',
    styleUrl: './nav-toolbar.component.scss',
})
export class NavToolbarComponent {
    @Input() drawer!: MatDrawer;

    #layoutService = inject(LayoutService);
    isMobile: Signal<boolean> = this.#layoutService.isMobile;

    // DISABLE SCROLL WHEN MAT-SIDENAV is opened
    // drawerToggle() {
    //     this.drawer?.opened
    //         ? (document.body.style.overflow = 'unset')
    //         : (document.body.style.overflow = 'hidden');

    //     this.drawer?.toggle();
    // }
}
