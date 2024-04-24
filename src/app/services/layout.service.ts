import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, Signal, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawer } from '@angular/material/sidenav';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    #breakpointObserver = inject(BreakpointObserver);

    drawer!: Signal<MatDrawer | undefined>;

    isMobile: Signal<boolean> = toSignal(
        this.#breakpointObserver
            .observe(Breakpoints.XSmall)
            .pipe(map((result) => result.matches)),
        { initialValue: false },
    );

    constructor() {}
}
