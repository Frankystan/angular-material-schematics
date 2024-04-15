import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Signal, computed, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SidenavBodyComponent } from '@layout/sidenav-body/sidenav-body.component';
import { SidenavHeaderComponent } from '@layout/sidenav-header/sidenav-header.component';
import { FabScrollToTopComponent } from '@layout/fab-scroll-to-top/fab-scroll-to-top.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs/operators';
import { BtnProfileComponent } from '@layout/btn-profile/btn-profile.component';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

/*
Scrolling
https://stackoverflow.com/questions/47528852/angular-material-sidenav-cdkscrollable/50812763#50812763

https://stackblitz.com/edit/sidenavcontainer-scrollable-elementscrolled-1?file=src%2Fapp%2Fapp.component.ts



PORTALS
TOOLBAR WITH PAGE ACTION PORTALS
https://juri.dev/blog/2018/05/dynamic-ui-with-cdk-portals/


*/
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    SidenavBodyComponent,
    SidenavHeaderComponent,
    RouterModule,
    FabScrollToTopComponent,
    BtnProfileComponent,
  ],
})
export class NavigationComponent {
  #breakpointObserver = inject(BreakpointObserver);
  #scrollDispatcher = inject(ScrollDispatcher);

  drawer: Signal<MatSidenav | undefined> = viewChild('drawer');

  isMobile: Signal<boolean> = toSignal(
    this.#breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );
  offSet: number = 300;
  lastPosition: number = 0;
  currentPosition: number = 0;
  show = signal(false);
  v!:boolean;

  constructor(){
    effect(()=>{
        this.v = this.visible();
    })
  }

  close() {
    if (this.isMobile()) this.drawer()?.close();
  }


  visible = toSignal(
    this.#scrollDispatcher.scrolled().pipe(
        map((event: any) => event.getElementRef().nativeElement),
        map((el: HTMLElement) => {
            this.currentPosition = el.scrollTop;
            // let show:boolean = false;

            switch (true) {
                case this.currentPosition == 0: // TOP
                    this.show.set( false);
                    break;
                case this.currentPosition > this.lastPosition: // DOWN
                    this.show.set( false);
                    break;
                case (this.lastPosition - this.offSet) >= 0: // UP
                    this.show.set( true);
                    break;

                default:
                    this.show.set( false);
                    break;
            }

            // console.log("show: ", this.show(), "current: ", this.currentPosition, "diff:", this.lastPosition - this.offSet);
            // console.log("current: ",this.currentPosition,"last: ",this.lastPosition,"diff:",this.lastPosition - this.offSet);


            this.lastPosition = this.currentPosition;
            
            
            
            this.v = this.show();
            return this.show();
        })
    )
,{ initialValue: false });

}
