import { A11yModule } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import {
    Validators,
    FormControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
    MAT_CHIPS_DEFAULT_OPTIONS,
    MatChipGrid,
    MatChipInputEvent,
    MatChipsModule,
} from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { environment } from '@env/environment.development';
import { ImgFromURLComponent } from '@layout/img-from-url/img-from-url.component';
import { TranslateModule } from '@ngx-translate/core';
import { getErrorMessage } from '@shared/utils';
import { trimmedRequired } from '@shared/validators/trim-required.validator';
import { EditorModule } from '@tinymce/tinymce-angular';
import { startWith, map, Observable } from 'rxjs';

export interface User {
    firstName: string;
    lastName: string;
    fruits: Array<string>;
}

@Component({
    selector: 'app-post-form',
    standalone: true,
    imports: [
        A11yModule,
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
        TranslateModule,
        EditorModule,
        ImgFromURLComponent,
    ],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.scss',
    providers: [
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER, COMMA],
            },
        },
    ],
})
export class PostFormComponent {
    #destroyRef = inject(DestroyRef);
    #fb = inject(FormBuilder);

    getErrorMessage = getErrorMessage;

    @ViewChild('fruitList') fruitList: MatChipGrid;

    tinyMCEconfig = environment.tinyMCEconfig;

    isUserWindoDark: boolean = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;

    public selectable = true;
    public removable = true;
    public addOnBlur = true;
    public form: FormGroup;
    public user: User = {
        firstName: 'Lindsey',
        lastName: 'Broos',
        fruits: [],
    };
    public fruits = ['lemon', 'lime', 'orange', 'strawberry', 'raspberry'];
    public filteredFruits$: Observable<string[]>;

    ngOnInit(): void {
        this.buildForm();
    }

    deleteImage($event: Event, url: string) {
        $event.preventDefault();
    }

    private buildForm(): void {
        const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.form = this.#fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            featured_image: ['', Validators.pattern(regex)],
            fruitInput: [null],
            fruits: [this.user.fruits, this.validateFruits],
        });

        this.form
            .get('fruits')
            .statusChanges.subscribe(
                (status) => (this.fruitList.errorState = status === 'INVALID'),
            );

        this.filteredFruits$ = this.form.get('fruitInput').valueChanges.pipe(
            startWith(''),
            map((value) => this.fruitFilter(value)),
        );
    }

    public addFruit(event: MatChipInputEvent): void {
        const input = event.chipInput?.inputElement;
        const value = (event.value || '').trim();

        if (value) {
            const matches = this.fruits.filter(
                (fruit) => fruit.toLowerCase() === value,
            );
            const formValue = this.form.get('fruits').value;
            const matchesNotYetSelected =
                formValue === null
                    ? matches
                    : matches.filter(
                          (x) => !formValue.find((y: any) => y === x),
                      );
            if (matchesNotYetSelected.length === 1) {
                this.user.fruits.push(matchesNotYetSelected[0]);
                this.form.get('fruits').setValue(this.user.fruits);

                this.form.get('fruitInput').setValue('');
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
            this.form.get('fruits').setValue(this.user.fruits);
            this.form.get('fruitInput').setValue('');
        }
    }

    public selectFruit(event: MatAutocompleteSelectedEvent): void {
        if (!event.option) {
            return;
        }

        const value = event.option.value;

        if (value && !this.user.fruits.includes(value)) {
            this.user.fruits.push(value);
            this.form.get('fruits').setValue(this.user.fruits);
            console.log('user fruits: ', this.user.fruits);

            this.form.get('fruitInput').setValue('');
        }
    }

    public save(): void {
        console.log(this.user);
        console.log(this.form.get('fruits'));
    }

    private fruitFilter(value: any): string[] {
        const filterValue =
            value === null || value instanceof Object
                ? ''
                : value.toLowerCase();
        const matches = this.fruits.filter((fruit) =>
            fruit.toLowerCase().includes(filterValue),
        );
        const formValue = this.form.get('fruits').value;
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
