import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IfMobileDirective } from '@shared/directives/if-mobile.directive';

@Component({
    selector: 'app-btn-profile',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, IfMobileDirective],
    template: `
        <button
            mat-icon-button
            class="profile"
            (click)="goTo()"
            *ifMobile="false"
        ></button>
    `,
    styles: [
        `
            button.profile {
                background-image: url('https://www.dhresource.com/webp/m/0x0/f2/albu/g16/M01/A8/58/rBVa4F-vxAKAN-Y1AAHXktw9e8E200.jpg');
                background-size: cover;
                border: 2px whitesmoke inset;
                margin: 0 1rem;
            }
        `,
    ],
})
export class BtnProfileComponent {
    #router = inject(Router);

    goTo() {
        this.#router.navigate(['/profile']);
    }
}
