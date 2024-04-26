import {
    Directive,
    ElementRef,
    HostListener,
    Renderer2,
    inject,
    signal,
} from '@angular/core';

/*
https://www.telerik.com/blogs/angular-basics-angular-custom-directive
https://medium.com/@shachsan/property-event-binding-with-custom-attribute-directive-in-angular-d4dac5590774
*/

@Directive({
    selector: '[visibilityPasswordIcon],[visibility-password-icon]',
    standalone: true,
})
export class VisibilityPasswordIconDirective {
    eleRef = inject(ElementRef);
    renderer = inject(Renderer2);

    hide: boolean = true;
    visibilityIcon = signal('visibility_off');

    @HostListener('click') onClick() {
        this.eleRef.nativeElement.textContent = 'visibility_off';
        let n = this.renderer.createText('visibility_off');
        this.renderer.appendChild(this.eleRef.nativeElement, n);
        this.hide = !this.hide;
        this.changeVisibility();
    }

    // @HostListener("click", [('$event')]) onClick(event) {
    //     if (this.allowEdit) {
    //         this.makeEditable();
    //     }
    // }

    private changeVisibility() {
        this.hide
            ? this.visibilityIcon.set('visibility')
            : this.visibilityIcon.set('visibility_off');

        // this.eleRef.nativeElement.innerText = "visibility_off";
        this.eleRef.nativeElement.textContent = 'visibility_off';
        return 'visibility_off';
    }
}
