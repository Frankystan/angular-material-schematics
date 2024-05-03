import { Component, Input, input, model } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/*
https://stackoverflow.com/questions/73455294/how-do-i-get-access-to-from-control-from-another-component-in-angular
*/

@Component({
    selector: 'app-img-from-url',
    standalone: true,
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './img-from-url.component.html',
    styleUrl: './img-from-url.component.scss',
})
export class ImgFromURLComponent {
    control: FormControl;

    @Input('control') set _control(value: any) {
        this.control = value as FormControl;
    }

    onClick() {
        this.control.setValue('');
    }
}
