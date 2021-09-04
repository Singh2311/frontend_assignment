import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookCategoryComponent } from './book-category.component';


const routes: Routes = [
  {
    path: '',
    component: BookCategoryComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookCategoryRoutingModule { }
