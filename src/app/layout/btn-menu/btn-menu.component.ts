import { NgIf } from '@angular/common';
import { Component, Signal, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { LayoutService } from '@shared/services/layout.service';

@Component({
    selector: 'btn-menu',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, NgIf],
    template: `
        <button
            *ngIf="isMobile()"
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
    isMobile: Signal<boolean> = inject(LayoutService).isMobile;
}
