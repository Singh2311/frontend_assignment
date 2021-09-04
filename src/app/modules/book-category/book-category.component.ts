import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss']
})
export class BookCategoryComponent implements OnInit {

  constructor(private route: Router) { }

  genereList: any = [
    {
      'name': "FICTION",
      'image': "assets/image/Fiction.svg"
    },
    {
      'name': "DRAMA",
      'image': "assets/image/Drama.svg"
    },

    {
      'name': "HUMOR",
      'image': "assets/image/Humour.svg"
    },
    {
      'name': "POLITICS",
      'image': "assets/image/Politics.svg"
    },
    {
      'name': "PHILOSOPHY",
      'image': "assets/image/Philosophy.svg"
    },
    {
      'name': "HISTORY",
      'image': "assets/image/History.svg"
    },
    {
      'name': "ADVENTURE",
      'image': "assets/image/Adventure.svg"
    }

  ]
  ngOnInit() {
  }


  getBooks(data) {
    this.route.navigate(['/book-list', encodeURIComponent(data.name)])
  }





}
