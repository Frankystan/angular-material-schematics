import { A11yModule } from '@angular/cdk/a11y';
import { JsonPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { VisibilityPasswordIconDirective } from '@shared/directives/visibility-password-icon.directive';
import { getErrorMessage } from '@shared/utils';
import { matchValidator } from '@shared/validators/match-password.validator';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        JsonPipe,
        ReactiveFormsModule,
        A11yModule,
        VisibilityPasswordIconDirective
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
    getErrorMessage = getErrorMessage;

    hide = signal(true);
    form!: FormGroup;

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.form = new FormGroup({
            displayName: new FormControl('Fran', [Validators.required]),
            email: new FormControl('fffernandez84@gmail.com', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('123456', [
                Validators.required,
                // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25),
                matchValidator('confirmPassword', true),
            ]),

            confirmPassword: new FormControl('123456', [
                Validators.required,
                matchValidator('password'),
            ]),
        });
    }

    save() {}
}
