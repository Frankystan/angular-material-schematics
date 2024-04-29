import { A11yModule } from '@angular/cdk/a11y';
import { Component, OnInit, signal } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { getErrorMessage } from '@shared/utils';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { VisibilityPasswordIconDirective } from '@shared/directives/visibility-password-icon.directive';
import { TranslateModule } from '@ngx-translate/core';
import { trimmedRequired } from '@shared/validators/trim-required.validator';

/*
https://hackernoon.com/es/como-usar-la-directiva-de-enfoque-trampa-cdk-angular
https://briantree.se/using-the-angular-cdk-trap-focus-directive/
*/

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        A11yModule,
        JsonPipe,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule,
        VisibilityPasswordIconDirective,
        TranslateModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    getErrorMessage = getErrorMessage;

    hide = signal(true);
    form!: FormGroup;

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.form = new FormGroup({
            email: new FormControl('fffernandez84@gmail.com', [
                Validators.email,
                trimmedRequired,
            ]),
            password: new FormControl('123456', [
                trimmedRequired,
                // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25),
            ]),
        });
    }

    save() {}

    socialLogin(provider: string) {
        console.log('social login: ', provider);
    }
}
