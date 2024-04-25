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
import { map, startWith, tap } from 'rxjs/operators';
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
    @ViewChild('chipGrid') chipGrid: MatChipGrid;

    getErrorMessage = getErrorMessage;

    // separatorKeysCodes: number[] = [ENTER, COMMA];
    form!: FormGroup;
    user: User = {
        firstName: 'Lindsey',
        lastName: 'Broos',
        fruits: [],
    };
    addOnBlur = true;
    fruitCtrl = new FormControl('');
    filteredFruits: Observable<string[]>;

    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    constructor() {

    }

    ngOnInit(): void {
        this.form = new FormGroup({
            firstName: new FormControl(this.user.firstName, [
                Validators.required,
            ]),
            lastName: new FormControl(this.user.lastName, [
                Validators.required,
            ]),
            fruitInput: new FormControl(null),
            fruits: new FormArray([]),
        });

        this.form
            .get('fruits')
            .statusChanges.subscribe(
                (status) => (this.chipGrid.errorState = status === 'INVALID'),
            );

        this.filteredFruits = this.form.get("fruitInput").valueChanges.pipe(
            startWith(""),
            map(value => this.fruitFilter(value))
        );


        // this.filteredFruits = this.form.get('fruitInput').valueChanges.pipe(
        //     startWith(null),
        //     tap(fruit => console.log("fruta: ", fruit)
        //     ),
        //     map((fruit: string | null) =>
        //         fruit ? this._filter(fruit) : this.allFruits.slice(),
        //     ),
        // );
    }

    get fruits() {
        return this.form.controls['fruits'] as FormArray;
    }

    add(event: MatChipInputEvent): void {
        const input = event.chipInput?.inputElement;

        const value = (event.value || '').trim();

        if (value) {
            this.fruits.push(new FormControl(value));
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    remove(index: any): void {
        this.fruits.removeAt(index);
        console.log(`Fruta eliminada: ${index}`);
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        if (!event.option) {
            return;
        }

        const value = event.option.value;
        console.log(
            '🚀 ~ file: linea:208 ~ value :',
            value,
        );

        if (
            value &&
            !this.user.fruits.includes(value)
        ) {
            console.log("paso por aki");
            
            this.fruits.push(new FormControl(event.option.viewValue));
            // this.form.get('fruits').setValue(this.user.fruits);
            this.form.get('fruitInput').setValue('');
        }
    }

    private fruitFilter(value: any) {
        const filterValue =
          value === null || value instanceof Object ? "" : value.toLowerCase();
        const matches = this.allFruits.filter(fruit =>
          fruit.toLowerCase().includes(filterValue)
        );
        const formValue = this.form.get("fruits").value;

        let f = formValue === null
        ? matches
        : matches.filter(x => !formValue.find((y:any) => y === x));
        return [...f]
      }

    save() {
        console.log(
            '🚀 ~ file: linea:198 ~ Formulario ~ save:',
            this.form.value,
        );
    }

    removeItem<T>(arr: Array<T>, value: T): Array<T> {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
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
