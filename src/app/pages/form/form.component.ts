import {
    Component,
    DestroyRef,
    ElementRef,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormArray,
    FormBuilder,
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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
    MAT_CHIPS_DEFAULT_OPTIONS,
    MatChipEditedEvent,
    MatChipGrid,
    MatChipInputEvent,
    MatChipListbox,
    MatChipOption,
    MatChipsModule,
} from '@angular/material/chips';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { tPost } from '@shared/custom-types/custom.type';
import { getErrorMessage } from '@shared/utils';
import {
    MatAutocompleteSelectedEvent,
    MatAutocompleteModule,
} from '@angular/material/autocomplete';

export interface User {
    firstName: string;
    lastName: string;
    fruits: Fruit[];
}

export interface Fruit {
    id: number;
    name: string;
}

/*
https://stackblitz.com/edit/angular-chip-with-autocomplete-and-validation?file=src%2Fapp%2Fapp.component.html



https://www.youtube.com/watch?v=OR7AHU4u-AM
https://stackblitz.com/edit/angular-9gjwo4-h4f9ux?file=app/chips-input-example.ts
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
        AsyncPipe,
        FormsModule,
        JsonPipe,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatChipGrid,
        MatChipListbox,
        MatChipOption,
        MatChipOption,
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

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

    getErrorMessage = getErrorMessage;

    // separatorKeysCodes: number[] = [ENTER, COMMA];
    form!: FormGroup;
    user: User = {
        firstName: 'Lindsey',
        lastName: 'Broos',
        fruits: [],
    };
    fruitCtrl = new FormControl('');
    filteredFruits: Observable<string[]>;
    fruits: string[] = ['Lemon'];
    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    constructor() {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) =>
                fruit ? this._filter(fruit) : this.allFruits.slice(),
            ),
        );
    }

    ngOnInit(): void {
        this.form = this.#fb.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],

            // fruits: this.#fb.array( [this.user.fruits, this.validateFruits])
            fruits: this.#fb.array(this.user.fruits),
        });
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.fruits.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {
            this.fruits.splice(index, 1);

            console.log(`Fruta eliminada: ${fruit}`);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.fruits.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter((fruit) =>
            fruit.toLowerCase().includes(filterValue),
        );
    }

    save() {
        console.log(
            '🚀 ~ file: linea:198 ~ Formulario ~ save:',
            this.form.value,
        );
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
