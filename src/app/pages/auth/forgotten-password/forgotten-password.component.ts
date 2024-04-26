import { Component, OnInit, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgottenPasswordEmailSentDialogComponent } from '@layout/dialogs/forgotten-password-email-sent.dialog/forgotten-password-email-sent.dialog.component';
// import { TranslateModule } from '@ngx-translate/core';
import { getErrorMessage } from '@shared/utils';

@Component({
    selector: 'app-forgotten-password',
    standalone: true,
    imports: [
        MatCardModule,
        MatInputModule,
        // TranslateModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
    ],
    templateUrl: './forgotten-password.component.html',
    styleUrl: './forgotten-password.component.scss',
})
export class ForgottenPasswordComponent implements OnInit {
    form!: FormGroup;
    getErrorMessage: any = getErrorMessage;
    hide: boolean = true;

    #dialog = inject(MatDialog);

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.form = new FormGroup({
            email: new FormControl('fffernandez84@gmail.com', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(8),
                ],
            }),
        });
    }

    save() {
        console.log(
            '🚀 ~ ForgottenPasswordComponent ~ save ~ save:',
            this.form.value,
        );

        this.openDialog();
    }

    openDialog() {
        this.#dialog.open(ForgottenPasswordEmailSentDialogComponent, {
            panelClass: 'forgotten-password-email-sent-dialog',
            closeOnNavigation: true,
        });
    }
}
