import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [


  {
    path: 'book-category',
    loadChildren: './modules/book-category/book-category.module#BookCategoryModule',
  },
  {
    path: 'book-list/:name',
    loadChildren: './modules/book-list/book-list.module#BookListModule',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/book-category'
  },
  { path: '**', redirectTo: '/book-category' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
