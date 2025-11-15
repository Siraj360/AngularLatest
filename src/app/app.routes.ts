
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
      import('./contact-book/contact-book.component').then(cmp => cmp.ContactBookComponent),
    title: 'Contact Book - A Reactive Form'
  },
    {
    path: 'customer-info',
    loadComponent: () =>
      import('./customer-info/customer-info.component').then(cmp => cmp.CustomerInfoComponent),
    title: 'Contact Book - A Reactive Form'
  },
  {
    path: '**',
    redirectTo: 'contact-book'
  }
];

