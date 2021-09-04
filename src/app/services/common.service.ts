import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { Observable } from "rxjs";
@Injectable()
export class CommonService{
    constructor(private http:HttpClient){

    }


    getAllBooks(data){
        let url = environment.api_url + '/books';
        const params = this.mappedParams(data)
        url += '?' + params;
        return this.http.get(url)
    }


     mappedParams(data: any) {
        let params = [];
        Object.keys(data).forEach(key => {
          params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        })
        return params.join('&');
      }
}