import {
    Component,
    DestroyRef,
    ElementRef,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    MAT_CHIPS_DEFAULT_OPTIONS,
    MatChipGrid,
    MatChipInputEvent,
    MatChipsModule,
} from '@angular/material/chips';
import {
    MatAutocompleteSelectedEvent,
    MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { getErrorMessage } from '@shared/utils';
import { map, startWith, tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// export type User = {
//     firstName: string;
//     lastName: string;
//     fruits: Array<string>;
// };

export interface User {
    firstName: string;
    lastName: string;
    fruits: Array<string>;
}

// export interface Fruit {
//     id: number;
//     name: string;
// }

/*
https://stackblitz.com/edit/angular-chip-with-autocomplete-and-validation?file=src%2Fapp%2Fapp.component.html



https://www.youtube.com/watch?v=OR7AHU4u-AM
https://stackblitz.com/edit/angular-9gjwo4-h4f9ux?file=app/chips-input-example.ts
https://dev.to/jdgamble555/validating-angular-material-chips-tags-43mp


https://medium.com/@akaravale/angular-reactive-formarray-adding-multiple-validation-rules-to-one-input-field-175b08d5bac9
https://www.samarpaninfotech.com/blog/angular-n-level-formarray-with-reactive-form-validation/
*/

/*
FORMULARIO CON VALIDACIONES
https://www.lindseybroos.be/2020/06/angular-material-chiplist-with-autocomplete-and-validation/



https://stackoverflow.com/questions/56492325/how-to-setup-angular-material-chip-contol-with-reactive-forms

https://stackblitz.com/edit/angular-material-chips-list?file=src%2Fapp%2Fapp.component.html

https://stackblitz.com/edit/ovb2sn?file=src%2Fapp%2Fchips-autocomplete-example.ts

https://github.com/angular/components/issues/26358

https://stackblitz.com/edit/angular-6g9jz1-zkc8ak?file=src%2Fapp%2Fchips-input-example.ts,src%2Fapp%2Fchips-input-example.html


https://stackoverflow.com/questions/46750182/angular-4-array-validation

*/

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        JsonPipe,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    providers: [
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER, COMMA],
            },
        },
    ],
})
export class FormComponent implements OnInit {
    #destroyRef = inject(DestroyRef);
    #fb = inject(FormBuilder);

    public selectable = true;
    public removable = true;
    public addOnBlur = true;
    public userForm: FormGroup;
    public user: User = {
        firstName: 'Lindsey',
        lastName: 'Broos',
        fruits: [],
    };
    public fruits = ['lemon', 'lime', 'orange', 'strawberry', 'raspberry'];
    public filteredFruits$: Observable<string[]>;

    getErrorMessage = getErrorMessage;

    // @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('fruitList') fruitList: MatChipGrid;

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    ngOnInit(): void {
        // this.user = user;
        this.buildUserForm();
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    };

    public selectFruit(event: MatAutocompleteSelectedEvent): void {
        if (!event.option) {
            return;
        }

        const value = event.option.value;

        if (value && !this.user.fruits.includes(value)) {
            this.user.fruits.push(value);
            this.userForm.get('fruits').setValue(this.user.fruits);
            console.log('user fruits: ', this.user.fruits);

            this.userForm.get('fruitInput').setValue('');
        }
    }

    public addFruit(event: MatChipInputEvent): void {
        const input = event.chipInput?.inputElement;
        const value = (event.value || '').trim();

        if (value) {
            const matches = this.fruits.filter(
                (fruit) => fruit.toLowerCase() === value,
            );
            const formValue = this.userForm.get('fruits').value;
            const matchesNotYetSelected =
                formValue === null
                    ? matches
                    : matches.filter(
                          (x) => !formValue.find((y: any) => y === x),
                      );
            if (matchesNotYetSelected.length === 1) {
                this.user.fruits.push(matchesNotYetSelected[0]);
                this.userForm.get('fruits').setValue(this.user.fruits);

                this.userForm.get('fruitInput').setValue('');
            }
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    public remove(fruit: any) {
        const index = this.user.fruits.indexOf(fruit);
        if (index >= 0) {
            this.user.fruits.splice(index, 1);
            this.userForm.get('fruits').setValue(this.user.fruits);
            this.userForm.get('fruitInput').setValue('');
        }
    }

    public submitForm(): void {
        console.log(this.user);
        console.log(this.userForm.get('fruits'));
    }

    private buildUserForm(): void {
        this.userForm = this.#fb.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            fruitInput: [null],
            fruits: [this.user.fruits, this.validateFruits],
        });

        this.userForm
            .get('fruits')
            .statusChanges.subscribe(
                (status) => (this.fruitList.errorState = status === 'INVALID'),
            );

        this.filteredFruits$ = this.userForm
            .get('fruitInput')
            .valueChanges.pipe(
                startWith(''),
                map((value) => this.fruitFilter(value)),
            );
    }

    private fruitFilter(value: any): string[] {
        const filterValue =
            value === null || value instanceof Object
                ? ''
                : value.toLowerCase();
        const matches = this.fruits.filter((fruit) =>
            fruit.toLowerCase().includes(filterValue),
        );
        const formValue = this.userForm.get('fruits').value;
        return formValue === null
            ? matches
            : matches.filter((x) => !formValue.find((y: any) => y === x));
    }

    private validateFruits(fruits: FormControl) {
        if (fruits.value && fruits.value.length === 0) {
            return {
                validateFruitsArray: { valid: false },
            };
        }

        return null;
    }
}
