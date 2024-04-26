import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    hide: boolean = true;
    form!: FormGroup;

    getErrorMessage = getErrorMessage;

    ngOnInit(): void {
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

    save() {}
}
