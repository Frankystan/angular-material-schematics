import { A11yModule } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
    Component,
    DestroyRef,
    Input,
    ViewChild,
    inject,
    input,
} from '@angular/core';
import {
    Validators,
    FormControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    FormArray,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { IPostForm, tPost } from '@shared/custom-types/custom.type';
import { DummyDataService } from '@shared/services/dummy-data.service';
import { I18nService } from '@shared/services/i18n.service';
import { getErrorMessage } from '@shared/utils';
import { tagValidatorMin, tagValidatorRequired } from '@shared/validators/tags.validator';
import { EditorModule } from '@tinymce/tinymce-angular';

/*
https://dev.to/jdgamble555/validating-angular-material-chips-tags-43mp

https://careydevelopment.us/blog/angular-material-how-to-bind-chips-to-a-form-field
https://dev.to/shhdharmen/angular-material-menu-nested-menu-using-dynamic-data-1nfm


https://stackoverflow.com/questions/12051945/tinymce-change-language-dynamically-with-javascript
https://github.com/Frankistan/ng11fireblog/tree/master/src/assets/tinymce/langs
https://jsfiddle.net/antd3tsf/19/
https://fiddle.tiny.cloud/nYbaab/2
*/
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
    #dummyDataService = inject(DummyDataService);
    #i18n = inject(I18nService);
    #fb = inject(FormBuilder);

    @ViewChild('chipGrid') chipGrid: MatChipGrid;

    isEditMode: boolean = false;
    isUserWindoDark: boolean = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;
    removable = true;
    addOnBlur = true;
    form: FormGroup;

    // version: Input decorator
    // @Input() set id(value: any) {
    //     this.isEditMode = value ? true : false;
    // }

    // version: signal
    id = input(null, {
        transform: (value: any) => {
            this.isEditMode = value ? true : false;
            return value;
        },
    });

    getErrorMessage = getErrorMessage;

    tinyMCEconfig = {
        language: this.#i18n.language == 'en-US' ? '' : this.#i18n.language,
        language_url:  this.#i18n.language == 'en-US' ? '' : `/langs/${this.#i18n.language}.js`,
        content_css: [this.isUserWindoDark ? 'dark' : 'default'],
        skin: this.isUserWindoDark ? 'oxide-dark' : 'oxide',
        ...environment.tinyMCEconfig,
    };

    ngOnInit(): void {
        this.form = this.buildForm();

        console.log('tinyMCEconfig: ', this.tinyMCEconfig);

        if (this.isEditMode) {
            let post: tPost = this.#dummyDataService.getOne(this.id());
            this.form.patchValue(post);
            this.form.setControl('tags', this.#fb.array(post.tags || []));
        }
    }

    buildForm() {
        const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        // TYPED FORM
        return new FormGroup<IPostForm>({
            id: new FormControl(''),
            title: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
            content: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
            featured_image: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.pattern(regex)],
            }),
            tags: new FormArray<any>([], {
                validators: [tagValidatorMin(1), tagValidatorRequired],
            }),
        });
    }

    get tagControls(): FormArray {
        return this.form.get('tags') as FormArray; //  return <FormArray>this.form.get('tags');
    }

    add(event: MatChipInputEvent): void {
        const input = event.chipInput;
        const value = event.value;

        // Get rid of duplicates
        if (!(this.tagControls.value as string[]).includes(value)) {
            // Add tag to new form group
            if (value.trim()) {
                const newVal = this.tagFormat(value);
                if (newVal) {
                    this.tagControls.push(new FormControl(newVal));
                    // Manually run validation on the new controls if they exist
                    this.tagControls.updateValueAndValidity();
                }
            }
        }

        // Reset the input value
        if (input) {
            input.clear();
        }

        // update chip error state
        this.chipGrid.errorState = this.tagControls.status === 'INVALID';
    }

    remove(index: any) {
        this.tagControls.removeAt(index);
        // update chip error state
        this.chipGrid.errorState = this.tagControls.status === 'INVALID';
    }

    save(): void {
        console.log(this.form.value);
    }

    /**
     * Format a tag in db for viewing
     * @param tag
     * @returns
     */
    tagFormat(tag: string): string {
        // can't begin with number or contain only number, no dashes
        return this.slugify(tag).replace(/-*/g, '').replace(/^\d+/, '');
    }

    /**
     * Create a slug from a string
     * @param value
     * @returns
     */
    slugify(value: string): string {
        return value
            .split('-')
            .join(' ')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '-');
    }
}
