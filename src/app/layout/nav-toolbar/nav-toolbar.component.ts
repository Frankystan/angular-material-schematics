import { Component, Signal, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutService } from '@shared/services/layout.service';
import { BtnProfileComponent } from '@layout/btn-profile/btn-profile.component';
import { BtnLanguageSelectorComponent } from '@layout/btn-language-selector/btn-language-selector.component';
import { IfViewportMatchDirective } from '@shared/directives/if-viewport-match.directive';
import { IfViewportSizeDirective } from '@shared/directives/if-viewport-size.directive';
import { IfMobileDirective } from '@shared/directives/if-mobile.directive';
import { BtnMenuComponent } from '@layout/btn-menu/btn-menu.component';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { PortalBridgeService } from '@shared/services/portal-bridge.service';
import { Observable } from 'rxjs';

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
        IfMobileDirective,
        BtnMenuComponent,
        PortalModule,
        NgStyle,
        NgIf,
        AsyncPipe,
    ],
    templateUrl: './nav-toolbar.component.html',
    styleUrl: './nav-toolbar.component.scss',
})
export class NavToolbarComponent {
    #portalBridgeService = inject(PortalBridgeService);
    isMobile: Signal<boolean> = inject(LayoutService).isMobile;

    drawer = input<MatDrawer>();

    portal$!: Observable<TemplatePortal>;

    ngOnInit(): void {
        this.portal$ = this.#portalBridgeService.portal$;
    }
}
