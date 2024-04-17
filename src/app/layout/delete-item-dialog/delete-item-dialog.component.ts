import { Component, inject } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
}
