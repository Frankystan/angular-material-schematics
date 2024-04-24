import { Injectable, inject } from '@angular/core';
import {
    MatSnackBarRef,
    SimpleSnackBar,
    MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    #snackBar = inject(MatSnackBar);

    #snackBarRef!: MatSnackBarRef<SimpleSnackBar>;

    open(message: string, action: string = '', duration: number = 4000) {
        this.configure(message, action, duration);
    }

    private configure(m: any, a: any, d: any) {
        this.#snackBarRef = this.#snackBar.open(m, a, {
            duration: d,
        });
        this.#snackBarRef.onAction().subscribe(() => {
            this.#snackBarRef.dismiss();
        });
    }
}
