import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    Renderer2,
    inject,
} from '@angular/core';

/*
https://www.telerik.com/blogs/angular-basics-angular-custom-directive
https://medium.com/@shachsan/property-event-binding-with-custom-attribute-directive-in-angular-d4dac5590774
*/

@Directive({
    selector: '[visibilityPasswordIcon],[visibility-password-icon]',
    standalone: true,
})
export class VisibilityPasswordIconDirective implements OnInit {
    eleRef = inject(ElementRef);
    renderer = inject(Renderer2);

    hide: boolean = true;
    visibilityIcon = 'visibility';

    @Output() onChange: EventEmitter<boolean> = new EventEmitter();

    ngOnInit(): void {
        this.changeVisibility();
    }

    @HostListener('click') onClick() {
        this.hide = !this.hide;
        let visibilityIcon = this.hide ? 'visibility' : 'visibility_off';
        this.setValue(visibilityIcon);
    }

    private changeVisibility() {
        let t = this.renderer.createText(this.visibilityIcon);
        this.renderer.appendChild(this.eleRef.nativeElement, t);
    }

    setValue(value: string): string {
        this.eleRef.nativeElement.innerText = value;
        this.visibilityIcon = value;
        this.onChange.emit(this.hide);
        return this.visibilityIcon;
    }
}
