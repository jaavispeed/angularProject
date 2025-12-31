import { Routes } from '@angular/router';

export const coreRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/components/core'),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('@app/components/dashboard/dashboard'),
      },
    ],
  },
];
