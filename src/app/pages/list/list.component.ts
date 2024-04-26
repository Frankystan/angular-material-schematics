import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { tPost } from '@shared/custom-types/custom.type';
import { DummyDataService } from '@shared/services/dummy-data.service';
import { faker } from '@faker-js/faker/locale/es';
import { DeleteItemDialogComponent } from '@layout/dialogs/delete-item-dialog/delete-item-dialog.component';
import { map } from 'rxjs/operators';

/*
https://stackoverflow.com/questions/48688614/angular-custom-style-to-mat-dialog
*/

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
        MatListModule,
        MatIconModule,
        RouterModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule,
        RouterModule,
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
})
export class ListComponent {
    dialog = inject(MatDialog);
    #destroyRef = inject(DestroyRef);
    #dummyDataService = inject(DummyDataService);

    list: tPost[] = this.#dummyDataService.getAll();

    delete(id: string) {
        this.openDialog(id);
    }

    private openDialog(id: string) {
        let dialogRef = this.dialog.open(DeleteItemDialogComponent, {
            panelClass: 'delete-dialog-panel',
            data: id,
        });

        dialogRef
            .afterClosed()
            .pipe(
                map((result) => {
                    if (!result) return false; // si pulsó fuera del dialogo
                    return result;
                }),
                takeUntilDestroyed(this.#destroyRef),
            )
            .subscribe((result) => {
                console.log('eliminado el item: ', result);
            });
    }
}
