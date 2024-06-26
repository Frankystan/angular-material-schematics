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
import { CardComponent } from '@pages/card/card.component';
import { GridComponent } from '@pages/grid/grid.component';
import { GridListDemoComponent } from '@pages/grid-list-demo/grid-list-demo.component';
import { PostComponent } from '@pages/posts/post.component';
import { POST_ROUTES } from '@pages/posts/post.routes';
import { LoginComponent } from '@pages/auth/login/login.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { AuthComponent } from '@pages/auth/auth.component';
import { AUTH_ROUTES } from '@pages/auth/auth.routes';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'card', component: CardComponent, title: 'Card' },
    { path: 'tree', component: TreeComponent, title: 'Tree' },
    { path: 'form', component: FormComponent, title: 'Form' },
    { path: 'login', component: LoginComponent, title: 'Login Form' },
    { path: 'register', component: RegisterComponent, title: 'Register Form' },
    { path: 'list', component: ListComponent, title: 'List' },
    { path: 'grid', component: GridComponent, title: 'Grid' },
    { path: '404', component: NotFoundComponent, title: '404' },
    { path: 'table', component: TableComponent, title: 'Table' },
    { path: 'address', component: AddressComponent, title: 'Address' },
    { path: 'profile', component: ProfileComponent, title: 'Profile' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
    { path: 'drag-drop', component: DragDropComponent, title: 'Drag & Drop' },
    {
        path: 'grid-demo',
        component: GridListDemoComponent,
        title: 'Grid List Demo',
    },
    {
        path: 'auth',
        component: AuthComponent,
        // Eager loading routes in a separate file
        children: [...AUTH_ROUTES],
    },
    {
        path: 'posts',
        component: PostComponent,
        children: [...POST_ROUTES],
        // Lazy load routes in a separate file
        // loadChildren: () =>	import('./pages/posts/post.routes')
    },

    { path: '**', redirectTo: '404', pathMatch: 'full' },
];
