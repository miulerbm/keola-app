import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { MembershipsComponent } from './pages/memberships/memberships.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'memberships',
        component: MembershipsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'schedule/:id',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
