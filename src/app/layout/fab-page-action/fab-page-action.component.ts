import {
    Component,
    ContentChild,
    Input,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
/*
https://stackoverflow.com/questions/74110568/angular-content-projection-access-data-of-component
*/
@Component({
    selector: 'fab-page-action',
    standalone: true,
    imports: [RouterModule, MatIconModule, MatButtonModule],
    template: `
        <a mat-fab [routerLink]="data.link" class="mat-fab-bottom-right">
            <mat-icon aria-label="edit post">{{ data.icon }}</mat-icon>
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
export class FabPageActionComponent {
    @Input() data?: { link: string; icon: string };
    // @ContentChild(TemplateRef) template: TemplateRef<any> | null = null;

    // ngOnInit(): void {
    //     this.data.map((item: any) => {
    //         item.name = item.name.toUpperCase();
    //         return item;
    //     });
    // }
}
