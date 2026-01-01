import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
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
    canMatch: [AuthenticatedGuard],
    loadChildren: () => import('@app/components/core.routes').then((m) => m.coreRoutes),
  },
];
