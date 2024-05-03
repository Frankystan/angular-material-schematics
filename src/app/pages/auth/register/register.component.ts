import { A11yModule } from '@angular/cdk/a11y';
import { Component, OnInit, computed, signal } from '@angular/core';
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
import { matchValidator } from '@shared/validators/match-password.validator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { VisibilityPasswordIconDirective } from '@shared/directives/visibility-password-icon.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ImgFromURLComponent } from '@layout/img-from-url/img-from-url.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        A11yModule,
        JsonPipe,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        VisibilityPasswordIconDirective,
        TranslateModule,
        ImgFromURLComponent,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
    getErrorMessage = getErrorMessage;

    hide = signal(true);
    form!: FormGroup;
    control = computed(() => {
        return this.form.get('photoURL');
    });

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        const urlPattern: string =
            '^(?:(?:https?|ftp)://)?(?:(?!(?:10|127)(?:.d{1,3}){3})(?!(?:169.254|192.168)(?:.d{1,3}){2})(?!172.(?:1[6-9]|2d|3[0-1])(?:.d{1,3}){2})(?:[1-9]d?|1dd|2[01]d|22[0-3])(?:.(?:1?d{1,2}|2[0-4]d|25[0-5])){2}(?:.(?:[1-9]d?|1dd|2[0-4]d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:.(?:[a-z\u00a1-\uffff]{2,})))(?::d{2,5})?(?:/S*)?$';

        const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        this.form = new FormGroup({
            displayName: new FormControl('Fran', [Validators.required]),
            email: new FormControl('fffernandez84@gmail.com', [
                Validators.required,
                Validators.email,
            ]),
            photoURL: new FormControl('', [Validators.pattern(regex)]),
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
