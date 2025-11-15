import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact-book',
    pathMatch: 'full'
  },
  {
    path: 'contact-book',
    loadComponent: () =>
      import('./contact-book/contact-book.component').then(c => c.ContactBookComponent)
  },
  {
    path: 'customer-info',
    loadComponent: () =>
      import('./customer-info/customer-info.component').then(c => c.CustomerInfoComponent)
  },
  {
    path: '**',
    redirectTo: 'contact-book'
  }
];
