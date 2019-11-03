import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  configUrl = 'https://cors-anywhere.herokuapp.com/http://jservice.io/';

  getCategory(offset: number, count: number) {
    return this.http.get<Category[]>(this.configUrl + '/api/categories?offset=' + offset + '&count=' + count);
  }
}