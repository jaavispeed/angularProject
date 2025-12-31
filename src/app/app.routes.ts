import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('@app/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'core',
    loadChildren: () => import('@app/components/core.routes').then((m) => m.coreRoutes),
  },
];
