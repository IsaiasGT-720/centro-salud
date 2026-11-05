import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), title: 'BIOZONE | Centro Médico' },
  { path: 'administracion', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent), title: 'Administración | BIOZONE' },
  { path: '**', redirectTo: '' }
];
