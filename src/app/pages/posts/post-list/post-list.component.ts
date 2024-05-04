import { Component, DestroyRef, inject } from '@angular/core';
import { DeletePostDialogComponent } from '@layout/dialogs/delete-post-dialog/delete-post-dialog.component';
import { DummyDataService } from '@shared/services/dummy-data.service';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tPost } from '@shared/custom-types/custom.type';
import { PageActionsComponent } from '@layout/page-actions/page-actions.component';

@Component({
    selector: 'app-post-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MomentModule,
        RouterModule,
        RouterModule,
        PageActionsComponent,
    ],
    templateUrl: './post-list.component.html',
    styleUrl: './post-list.component.scss',
})
export class PostListComponent {
    #dialog = inject(MatDialog);
    #destroyRef = inject(DestroyRef);
    #dummyDataService = inject(DummyDataService);

    list: tPost[] = this.#dummyDataService.getAll();

    delete(id: string) {
        this.openDialog(id);
    }

    private openDialog(id: string) {
        let dialogRef = this.#dialog.open(DeletePostDialogComponent, {
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

    onSave() {
        alert('Yay funciona!');
    }
}
