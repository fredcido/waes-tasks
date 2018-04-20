import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './services/auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthGuard]
    },
]
