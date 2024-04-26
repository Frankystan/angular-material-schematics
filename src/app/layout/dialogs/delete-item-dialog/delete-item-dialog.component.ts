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

/*
https://stackoverflow.com/questions/48688614/angular-custom-style-to-mat-dialog
*/

@Component({
    selector: 'app-delete-item-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
    ],
    templateUrl: './delete-item-dialog.component.html',
    styleUrl: './delete-item-dialog.component.scss',
})
export class DeleteItemDialogComponent {
    dialogRef = inject(MatDialogRef<DeleteItemDialogComponent>);
    data = inject(MAT_DIALOG_DATA);
}
