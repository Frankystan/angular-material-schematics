import { FormGroup } from '@angular/forms';

export function getErrorMessage(control: string, form: FormGroup<any>) {
    let errors = <Object>form.controls[control].errors;

    let key = Object.keys(errors)[0];

    switch (key) {
        case 'required':
            return 'validation.required';
        case 'email':
            return 'validation.email';
        case 'minlength':
            return 'validation.minlength';
        case 'pwdMatch':
            return 'validation.pwd-match';
        case 'matched':
            return 'validation.pwd-match';
        case 'pattern':
            return 'validation.url';
        case 'minTagsLength':
            return 'validation.minTagsLength';
        default:
            return '';
    }
}
