import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddressComponent } from './pages/address/address.component';
import { TableComponent } from './pages/table/table.component';
import { DragDropComponent } from './pages/drag-drop/drag-drop.component';
import { TreeComponent } from './pages/tree/tree.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { ListComponent } from '@pages/list/list.component';
import { FormComponent } from '@pages/form/form.component';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'tree', component: TreeComponent, title: 'Tree' },
    { path: 'form', component: FormComponent, title: 'Form' },
    { path: 'list', component: ListComponent, title: 'List' },
    { path: 'table', component: TableComponent, title: 'Table' },
    { path: '404', component: NotFoundComponent, title: '404' },
    { path: 'address', component: AddressComponent, title: 'Address' },
    { path: 'profile', component: ProfileComponent, title: 'Profile' },
    { path: 'drag-drop', component: DragDropComponent, title: 'Drag & Drop' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },

    { path: '**', redirectTo: '404', pathMatch: 'full' },
];
