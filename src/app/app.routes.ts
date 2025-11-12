
import { Routes } from '@angular/router';
import { ContactBookComponent } from './contact-book/contact-book.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact-book',
    pathMatch: 'full'
  },
    {
    path: 'contact-book',
    component: ContactBookComponent,
     loadComponent: () => import('./contact-book/contact-book.component').then(cmp => cmp.),
    title: 'Contact Book - A Reactive Form'
  },
    {
    path: '**',
    redirectTo: 'list'
  }
];
