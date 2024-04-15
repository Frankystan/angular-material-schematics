import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, Input, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-fab-scroll-to-top',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
	<ng-container >
		@if(isMobile){
			<button
				mat-mini-fab
				class="bottom-right"
				color="primary"
				aria-label="Scroll to top button"
				(click)="scrollToTop()"	>
			<mat-icon>arrow_upward</mat-icon>
			</button>
		}@else{
			<button
				mat-fab
				class="bottom-right"
				color="primary"
				aria-label="Scroll to top button"
				(click)="scrollToTop()"	>
			<mat-icon>arrow_upward</mat-icon>
			</button>
		}
	</ng-container>
 `,
  styles: [
    `
  .bottom-right {
		bottom: 5.5rem;
		cursor: pointer;
		float: right;
		left: auto;
		opacity: 0.7;
		position: fixed;
		right: 1.5rem;
		z-index: 1;
}
 
 `,
  ],
})
export class FabScrollToTopComponent {
  #scrollDispatcher = inject(ScrollDispatcher);

  @Input() isMobile!: boolean;

  viewport: Signal<HTMLElement | undefined> = toSignal(
    this.#scrollDispatcher.scrolled().pipe(
      map((event: any) => event.getElementRef().nativeElement),
      distinctUntilChanged()
    )
  );

  scrollToTop() {
    this.viewport()?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
