import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTitleStrategyService } from '@shared/services/custom-title-strategy.service';
import { slideInUpAnimation } from 'angular-animations';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    imports: [TranslateModule, MatListModule],
    animations: [
        slideInUpAnimation({ duration: 400, delay: 0, translate: '100%' }),
    ],
    templateUrl: './breadcrumbs.component.html',
    styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
    #router = inject(Router);
    #destroyRef = inject(DestroyRef);
    #ctitles = inject(CustomTitleStrategyService);

    animationState: boolean = false;
    title!: string;

    ngOnInit(): void {
        this.#router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .pipe(
                map((_) => this.#router.routerState.snapshot),
                map((snapshot) => this.#ctitles.buildTitle(snapshot)),
                takeUntilDestroyed(this.#destroyRef),
            )
            .subscribe((s: any) => {
                this.title = s;
                this.animate();
            });
    }

    animate() {
        this.animationState = false;
        setTimeout(() => {
            this.animationState = !this.animationState;
        }, 1);
    }
}
