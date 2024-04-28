import { Component, inject } from '@angular/core';
import {
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

/*
https://stackoverflow.com/questions/48688614/angular-custom-style-to-mat-dialog
*/

@Component({
    selector: 'app-delete-post-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        TranslateModule,
    ],
    templateUrl: './delete-post-dialog.component.html',
    styleUrl: './delete-post-dialog.component.scss',
})
export class DeletePostDialogComponent {
    dialogRef = inject(MatDialogRef<DeletePostDialogComponent>);
    data = inject(MAT_DIALOG_DATA);
}
