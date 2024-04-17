import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import {
    MatChipEditedEvent,
    MatChipInputEvent,
    MatChipsModule,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { JsonPipe } from '@angular/common';

export interface Fruit {
    name: string;
}



/*
https://www.youtube.com/watch?v=OR7AHU4u-AM
https://stackblitz.com/edit/angular-9gjwo4-h4f9ux?file=app/chips-input-example.ts
https://stackblitz.com/edit/angular-chip-with-autocomplete-and-validation?file=src%2Fapp%2Fapp.component.html
https://dev.to/jdgamble555/validating-angular-material-chips-tags-43mp



*/

/*
FORMULARIO CON VALIDACIONES
https://www.lindseybroos.be/2020/06/angular-material-chiplist-with-autocomplete-and-validation/


https://stackoverflow.com/questions/56492325/how-to-setup-angular-material-chip-contol-with-reactive-forms

https://stackblitz.com/edit/angular-material-chips-list?file=src%2Fapp%2Fapp.component.html

https://stackblitz.com/edit/ovb2sn?file=src%2Fapp%2Fchips-autocomplete-example.ts

https://github.com/angular/components/issues/26358

https://stackblitz.com/edit/angular-6g9jz1-zkc8ak?file=src%2Fapp%2Fchips-input-example.ts,src%2Fapp%2Fchips-input-example.html

*/

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule,
        JsonPipe,
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    form!: FormGroup;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);
    kwControl = new FormControl(['angular']);

    keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];

    fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

    errorMessage = '';
    hide = true;
    addOnBlur = true;

    constructor() {
        merge(this.email.statusChanges, this.email.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateErrorMessage());
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: this.email,
            password: this.password,
        });
    }

    updateErrorMessage() {
        if (this.email.hasError('required')) {
            this.errorMessage = 'You must enter a value';
        } else if (this.email.hasError('email')) {
            this.errorMessage = 'Not a valid email';
        } else {
            this.errorMessage = '';
        }
    }

    removeKeyword(keyword: string) {
        const index = this.keywords.indexOf(keyword);
        if (index >= 0) {
            this.keywords.splice(index, 1);
        }
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our keyword
        if (value) {
            this.keywords.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    save() {
        console.log('datos del formulario: ', this.form.value);
    }
}
