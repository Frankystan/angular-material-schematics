import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-forgotten-password-email-sent.dialog',
    standalone: true,
    imports: [TranslateModule, MatCardModule, MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>
            {{ 'dialog.password-reset-confirm-title' | translate }}
        </h2>
        <mat-dialog-content>{{
            'dialog.password-reset-confirm-subtitle' | translate
        }}</mat-dialog-content>
        <mat-dialog-actions data-layout-align="center">
            <button
                data-layout="row"
                color="primary"
                (click)="onNoClick()"
                mat-button
            >
                {{ 'input.back-to-login' | translate }}
            </button>
        </mat-dialog-actions>
    `,
    styleUrl: './forgotten-password-email-sent.dialog.component.scss',
})
export class ForgottenPasswordEmailSentDialogComponent {
    #dialogRef = inject(
        MatDialogRef<ForgottenPasswordEmailSentDialogComponent>,
    );
    #router = inject(Router);

    onNoClick(): void {
        this.#dialogRef.close();
        this.#router.navigate(['/auth/login']);
    }
}
