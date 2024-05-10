import { Routes } from '@angular/router';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { BorrowerComponent } from './borrower/borrower.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { ManagementComponent } from './management/management.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
  },
  {
    path: 'borrower',
    component: BorrowerComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
  },
  {
    path: 'borrowed-books',
    component: BorrowedBooksComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
  },
  {
    path: 'returned',
    component: TransactionsComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
    data: {
      isReturned: 1,
    },
  },
  {
    path: 'not-returned',
    component: TransactionsComponent,
    title: 'LIBRARY MANAGEMENT SYSTEM',
    data: {
      isReturned: 0,
    },
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
