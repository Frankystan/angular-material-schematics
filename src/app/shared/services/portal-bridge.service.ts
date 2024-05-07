import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PortalBridgeService {
    private activePortal = new Subject<TemplatePortal>();

    readonly portal$ = this.activePortal.asObservable();

    setPortal(portal: TemplatePortal) {
        this.activePortal.next(portal);
    }
}
