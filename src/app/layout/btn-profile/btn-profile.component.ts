import { NgIf } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@shared/services/layout.service';

@Component({
    selector: 'app-btn-profile',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, RouterModule, NgIf],
    template: `
        <a
            *ngIf="!isMobile()"
            mat-icon-button
            class="profile"
            routerLink="/profile"
        ></a>
    `,
    styles: [
        `
            a.profile {
                background-image: url('https://www.dhresource.com/webp/m/0x0/f2/albu/g16/M01/A8/58/rBVa4F-vxAKAN-Y1AAHXktw9e8E200.jpg');
                background-size: cover;
                border: 2px whitesmoke inset;
                margin: 0 1rem;
            }
        `,
    ],
})
export class BtnProfileComponent {
    isMobile: Signal<boolean> = inject(LayoutService).isMobile;
}
