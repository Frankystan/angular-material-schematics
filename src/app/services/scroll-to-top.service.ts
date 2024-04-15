import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {

    constructor(router: Router) {
        router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            console.log("PASO POR AKI");
          window.scrollTo(0, 0);
        });
      }
    }