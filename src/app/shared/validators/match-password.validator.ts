import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/*
https://dev.to/jdgamble555/angular-confirm-password-validation-custom-validator-3pkl
*/

export function matchValidator(
    matchTo: string,
    reverse?: boolean,
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent && reverse) {
            const c = (control.parent?.controls as any)[
                matchTo
            ] as AbstractControl;
            if (c) {
                c.updateValueAndValidity();
            }
            return null;
        }
        return !!control.parent &&
            !!control.parent.value &&
            control.value === (control.parent?.controls as any)[matchTo].value
            ? null
            : { matched: true };
    };
}
