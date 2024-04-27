import { Routes } from '@angular/router';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'title.login',
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'title.register',
    },
    {
        path: 'forgotten-password',
        component: ForgottenPasswordComponent,
        title: 'title.reset-password',
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent,
        title: 'title.verify-account',
    },
];
