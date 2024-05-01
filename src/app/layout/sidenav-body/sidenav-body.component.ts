import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { environment } from '@env/environment.development';
import { TranslateModule } from '@ngx-translate/core';

export type SidenavListItem = {
    icon: string;
    title: string;
    link?: string;
};

@Component({
    selector: 'app-sidenav-body',
    standalone: true,
    imports: [
        TranslateModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        NgClass,
    ],
    templateUrl: './sidenav-body.component.html',
    styleUrl: './sidenav-body.component.scss',
})
export class SidenavBodyComponent {
    #router = inject(Router);

    menuItems = signal<SidenavListItem[]>(environment.sidenav);

    logout() {
        this.#router.navigate(['']);
    }
}
