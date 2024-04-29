import {
    AbstractControl,
    FormControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

/*
https://andrewrosario.medium.com/dominando-as-valida%C3%A7%C3%B5es-customizadas-no-angular-8b6d1662616
https://blog.angular-university.io/angular-custom-validators/
https://www.telerik.com/blogs/how-to-create-custom-cross-form-control-validator-angular
https://angularindepth.com/posts/1319/the-best-way-to-implement-custom-validators
*/

// export function trimmedRequiredValidator(): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//         const value = control.value;

//         if (!value) {
//             return null;
//         }

//         const trimmed = value.trim();
//         const fieldValid = value && trimmed == '';

//         return !fieldValid ? { required: true } : null;
//     };
// }

// export  const  trimmedRequired:  ValidatorFn  = (control:AbstractControl):  ValidationErrors|  null  =>{
//     let  value  =  control.value.trim();
//     console.log("paso por aqui valor: ",value);

//     if( !value || (value == "")){
//         console.log("paso por required, valor: ",value);

//       return {
//         required :  true
//       }
//     }
//     return  null;
//   }

// export const trimmedRequired: ValidatorFn = (control: AbstractControl,): ValidationErrors | null => {
//     let value: string = control.value.trim();
//     console.log('paso por aqui valor: ', value);
//     if (!value) {
//         return null;
//     }

//     return !value || (value.trim() == "") ? { required: true } : null;
// }

export function blue(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        control.value?.trim() === '' ? null : { required: control.value };
}

export const trimmedRequired: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    return !control.value || control.value.trim() == ''
        ? { required: true }
        : null;
};
