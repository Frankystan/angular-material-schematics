import { Component } from '@angular/core';
import { NavigationComponent } from './layout/navigation/navigation.component';

/*
PORTALS
TOOLBAR WITH PAGE ACTION PORTALS
https://juri.dev/blog/2018/05/dynamic-ui-with-cdk-portals/
*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent],
  template: `
 	<app-navigation />
  `,
})
export class AppComponent {}
