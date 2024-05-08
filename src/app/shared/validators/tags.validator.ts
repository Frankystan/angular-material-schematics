import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Required Validator for tags
 * @param control
 * @returns
 */
export function tagValidatorRequired(
    control: AbstractControl,
): ValidationErrors | null {
    return control.value && control.value.length === 0
        ? { required: true }
        : null;
}

/**
 * Required Validator for tags
 * @param control
 * @returns
 */
export function tagValidatorMin(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value && control.value.length < min
            ? { minTagsLength: true }
            : null;
    };
}
