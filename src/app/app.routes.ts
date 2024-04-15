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

    { path: 'tree', component: TreeComponent },
    { path: 'form', component: FormComponent },
    { path: 'list', component: ListComponent },
    { path: 'table', component: TableComponent },
    { path: '404', component: NotFoundComponent },
    { path: 'address', component: AddressComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'drag-drop', component: DragDropComponent },
    { path: 'dashboard', component: DashboardComponent },

    { path: '**', redirectTo: '404', pathMatch: 'full' },
];
