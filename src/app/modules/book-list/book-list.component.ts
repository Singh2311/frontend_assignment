import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { debounceTime, pluck, distinctUntilChanged, takeWhile, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit, OnDestroy {
  searchData: any;
  topicName: string;
  allBooksData: any = [];
  throttle = 100;
  scrollDistance = 3;
  scrollUpDistance = 2;
  count: number = 1;
  dataOver: boolean = false;
  showLoader: boolean = true;

  @ViewChild('searchForm', { static: false }) searchForm: NgForm;
  formValue: Subscription;
  constructor(private commonService: CommonService, private routes: ActivatedRoute, private route: Router) {

    this.routes.params.subscribe((data) => {
      this.topicName = decodeURIComponent(data.name)
      this.getBooksTopicWise(data.name)
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const formValue = this.searchForm.valueChanges;
    this.formValue = formValue.pipe(
      pluck('searchTerm'),
      debounceTime(1000), distinctUntilChanged(),

    )
      .subscribe((data) => {
        this.searchData = data;
        if (data && data.length > 0) {

          this.count = 1;
          this.allBooksData = [];
          this.showLoader = true;
          this.getBooksTopicWise(this.topicName, this.searchData)
        }
        else {
          this.getBooksTopicWise(this.topicName)
        }

      })
  }

  ngOnDestroy() {
    this.formValue.unsubscribe();
  }


  onScrollDown(ev) {

    if (!this.dataOver) {
      this.showLoader = true;
      this.count += 1;

      this.getBooksTopicWise(this.topicName, this.searchData);
    }


  }




  getBooksTopicWise(topic, search_data?) {
    let obj = {
      topic: topic,
      page: this.count,
      mime_type: 'image/jpeg'
    }
    if (search_data) {
      obj['search'] = search_data
    }

    this.commonService.getAllBooks(obj).subscribe((data: any) => {

      if (data.next || this.count == 1) {
        if (this.allBooksData.length > 0) {

          this.allBooksData = this.allBooksData.concat(data.results);
          this.showLoader = false;
        }
        else {
          this.allBooksData = data.results;

          this.showLoader = false;
        }
      }
      else {
        this.dataOver = true;
        this.showLoader = false;
      }


    },
      error => {

        this.route.navigate(['/book-category'])
      }

    )
  }


  viewBook(data) {

    if (data.formats) {
      let txt, htm, pdf;
      for (let format in data.formats) {
        let format_type = data.formats[format].split('.').pop();

        if (format_type == 'txt') {
          txt = data.formats[format];
        }
        else if (format_type == 'htm' || format_type == 'html') {
          htm = data.formats[format];
        }
        else if (format_type == 'pdf') {
          pdf = data.formats[format];
        }

      }

      if (htm) {
        window.open(htm);
        return;
      }
      if (pdf) {
        window.open(pdf);
        return;
      }
      if (txt) {
        window.open(txt);
        return;
      }
      alert('No viewable version available')

    }
    else {
      alert('No viewable version available')
    }




  }

}


