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
import { getErrorMessage } from '@shared/utils';
import { A11yModule } from '@angular/cdk/a11y';
import { VisibilityPasswordIconDirective } from '@shared/directives/visibility-password-icon.directive';

/*
https://hackernoon.com/es/como-usar-la-directiva-de-enfoque-trampa-cdk-angular
https://briantree.se/using-the-angular-cdk-trap-focus-directive/
*/

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        JsonPipe,
        ReactiveFormsModule,
        A11yModule,
        VisibilityPasswordIconDirective,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    hide: boolean = true;
    form!: FormGroup;

    getErrorMessage = getErrorMessage;

    ngOnInit(): void {
        this.buildForm();
    }

    visibilityIcon = signal('visibility_off');

    buildForm() {
        this.form = new FormGroup({
            email: new FormControl('fffernandez84@gmail.com', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('123456', [
                Validators.required,
                // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25),
            ]),
        });
    }

    changeVisibility() {
        this.hide = !this.hide;
        this.hide
            ? this.visibilityIcon.set('visibility')
            : this.visibilityIcon.set('visibility_off');
    }

    save() {}
}
