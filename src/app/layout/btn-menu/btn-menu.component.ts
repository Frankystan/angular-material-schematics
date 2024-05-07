import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { IfMobileDirective } from '@shared/directives/if-mobile.directive';

@Component({
    selector: 'btn-menu',
    standalone: true,
    imports: [IfMobileDirective, MatIconModule, MatButtonModule],
    template: `
        <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer().toggle()"
        >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
        </button>
    `,
})
export class BtnMenuComponent {
    drawer = input<MatDrawer>();
}
