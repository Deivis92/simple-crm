import { Routes } from '@angular/router';
import path from 'path';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    }
];
