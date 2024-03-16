import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { ManagementComponent } from './management/management.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
  },
  {
    path: 'management',
    component: ManagementComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
  },
];
