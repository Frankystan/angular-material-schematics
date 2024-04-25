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
import { map, startWith } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type User = {
    firstName: string;
    lastName: string;
    fruits: Array<string>;
};

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

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('chipGrid') chipGrid: MatChipGrid;

    getErrorMessage = getErrorMessage;

    form!: FormGroup;
    user: User = {
        firstName: '',
        lastName: '',
        fruits: [],
    };
    addOnBlur = true;
    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    filteredFruits$: Observable<string[]>;

    ngOnInit(): void {
        this.buildForm();

        this.form
            .get('fruits')
            .statusChanges.pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(
                (status) => (this.chipGrid.errorState = status === 'INVALID'),
            );

        this.filteredFruits$ = this.form.get('fruitInput').valueChanges.pipe(
            startWith(''),
            map((value) => this.fruitFilter(value)),
            takeUntilDestroyed(this.#destroyRef),
        );
    }

    buildForm() {
        this.form = new FormGroup({
            firstName: new FormControl('Fran', [Validators.required]),
            lastName: new FormControl('Fontanes Fernandez', [
                Validators.required,
            ]),
            fruitInput: new FormControl(null),
            fruits: new FormArray([]),
        });
    }

    get fruits() {
        return this.form.controls['fruits'] as FormArray;
    }

    add(event: MatChipInputEvent): void {
        const input = event.chipInput?.inputElement;
        const value = (event.value || '').trim();

        if (value) {
            let matches = this.allFruits.filter(
                (fruit) => fruit.toLowerCase() === value,
            );
            let formValue = this.form.get('fruits').value;
            let matchesNotYetSelected =
                formValue === null
                    ? matches
                    : matches.filter(
                          (x) => !formValue.find((y: any) => y === x),
                      );
            if (matchesNotYetSelected.length === 1) {
                this.user.fruits.push(matchesNotYetSelected[0]);

                // this.form.get("fruits").setValue(this.user.fruits);
                this.fruits.push(new FormControl(value));

                this.form.get('fruitInput').setValue('');
            }
        }

        // Reset the input value
        if (input) {
            input.value = '';
            // event.chipInput!.clear();
        }
    }

    remove(index: any): void {
        this.fruits.removeAt(index);
        if (index >= 0) {
            this.user.fruits.splice(index, 1);
            //   this.form.get("fruits").setValue(this.user.fruits);
            this.form.setControl(
                'fruits',
                this.#fb.array(this.user.fruits || []),
            );
            this.form.get('fruitInput').setValue('');
        }
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        if (!event.option) {
            return;
        }

        const value = event.option.value;

        if (value && !this.user.fruits.includes(value)) {
            this.user.fruits.push(value);
            this.form.setControl(
                'fruits',
                this.#fb.array(this.user.fruits || []),
            );
            this.form.get('fruitInput').setValue('');
        }
    }

    private fruitFilter(value: any) {
        const filterValue = value === null ? '' : value.toLowerCase();
        const matches = this.allFruits.filter((fruit) =>
            fruit.toLowerCase().includes(filterValue),
        );
        const formValue = this.form.get('fruits').value;
        return formValue === null
            ? matches
            : matches.filter((x) => !formValue.find((y: any) => y === x));
    }

    save() {}
}
