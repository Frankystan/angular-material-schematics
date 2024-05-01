import { Component, Input, Signal, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@shared/services/layout.service';

@Component({
    selector: 'app-sidenav-header',
    standalone: true,
    imports: [MatToolbarModule, MatListModule, RouterModule],
    templateUrl: './sidenav-header.component.html',
    styleUrl: './sidenav-header.component.scss',
})
export class SidenavHeaderComponent {
    @Input() drawer!: MatDrawer;

    isMobile: Signal<boolean> = inject(LayoutService).isMobile;

    close() {
        if (this.isMobile()) this.drawer.close();
    }
}
