import { Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorFormsComponent } from './authors/author-forms/author-forms.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
  path: '',
  redirectTo: 'authors',
  pathMatch: 'full'
  },
  {
    path:'authors',
    component: AuthorsComponent,
    children:[
      {
        path: '',
        component: AuthorListComponent
      },
      {
        path: 'new',
        component: AuthorFormsComponent
      },
      {
        path: 'edit/:id',
        component: AuthorFormsComponent
      },
      {
        path: 'detail/:id',
        component: AuthorDetailsComponent
      }
    ]
  },
  {
    path: 'book',
    component: BookComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'addBook',
        component: BookFormComponent
      },
      {
        path: 'edit/:id',
        component: BookFormComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
