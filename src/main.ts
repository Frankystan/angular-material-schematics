import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import 'zone.js';

/*
LOAD FLAG ICONS from node_modules, FIX 
usar ambas soluciones:
https://github.com/lipis/flag-icons/issues/1142#issuecomment-1806073320
https://github.com/lipis/flag-icons/issues/1142#issuecomment-1806814863
*/

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err),
);
