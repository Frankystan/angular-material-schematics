import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [RouterOutlet],
    template: ` <router-outlet /> `,
    styles: '',
})
export class PostComponent {}
