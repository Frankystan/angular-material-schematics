import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleStrategyService extends TitleStrategy{

    #title = inject(Title);

    updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot) || '';

        if (title) {
            console.log("paso por aki");
            
            this.#title.setTitle(`AMS | ${title}`);
        } else {
            // this.#title.setTitle('DEFAULT_TITLE');
            this.#title.setTitle('AMS');
        }
    }
}
