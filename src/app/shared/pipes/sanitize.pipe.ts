import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'sanitize',
    standalone: true,
})
export class SanitizePipe implements PipeTransform {
    private sanitizer = inject(DomSanitizer);

    transform(value: string, ...args: unknown[]): unknown {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
