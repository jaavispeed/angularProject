import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canMatch: [notAuthenticatedGuard],
    loadChildren: () => import('@app/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'core',
    loadChildren: () => import('@app/components/core.routes').then((m) => m.coreRoutes),
  },
];
