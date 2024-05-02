import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'fab-edit-post',
    standalone: true,
    imports: [RouterModule, MatIconModule, MatButtonModule],
    template: `
        <a
            mat-fab
            [routerLink]="['/posts/', id(), 'edit']"
            class="mat-fab-bottom-right"
        >
            <mat-icon aria-label="edit post">edit</mat-icon>
        </a>
    `,
    styles: [
        `
            :host {
                bottom: 1.5rem;
                cursor: pointer;
                left: auto;
                position: fixed;
                right: 1.5rem;
                z-index: 1;
            }
        `,
    ],
})
export class FabEditPostComponent {
    id = input.required<string>();
    // @Input() id?: string;
}
