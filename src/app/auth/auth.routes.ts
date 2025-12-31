import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/auth/auth'),
    children: [
      {
        path: '',
        loadComponent: () => import('@app/auth/login/login'),
        pathMatch: 'full',
      },
      {
        path: 'register',
        loadComponent: () => import('@app/auth/register/register'),
      },
    ],
  },
];
