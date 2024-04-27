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
                background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
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
