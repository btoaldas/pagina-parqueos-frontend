import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TabsPage } from './shared/tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./auth/forgot/forgot.page').then((m) => m.ForgotPage),
  },
  {
    path: 'two-factor',
    loadComponent: () =>
      import('./auth/two-factor/two-factor.page').then((m) => m.TwoFactorPage),
  },
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./client/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./client/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./admin/users/users.page').then((m) => m.UsersPage),
      },
      {
        path: 'users/new',
        loadComponent: () =>
          import('./admin/users-new/users-new.page').then(
            (m) => m.UsersNewPage
          ),
      },
      {
        path: 'users/edit/:id',
        loadComponent: () =>
          import('./admin/users-edit/users-edit.page').then(
            (m) => m.UsersEditPage
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./admin/reports/reports.page').then((m) => m.ReportsPage),
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
