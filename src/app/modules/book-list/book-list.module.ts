import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListRoutingModule } from './book-list-routing.module';
import { BookListComponent } from './book-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BookListComponent],
  imports: [
    CommonModule,
    BookListRoutingModule,
    InfiniteScrollModule,
    FormsModule
  ]
})
export class BookListModule { }
