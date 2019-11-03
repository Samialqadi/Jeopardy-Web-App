import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category/category';
import { Question } from '../question/question';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  configUrl = 'https://cors-anywhere.herokuapp.com/http://jservice.io/';

  getCategory(offset: number, count: number) {
    return this.http.get<Category[]>(this.configUrl + '/api/categories?offset=' + offset + '&count=' + count);
  }

  getQuestion(value: number, category: number, min_date: string, max_date: string, offset: number) {
    return this.http.get<Question[]>(this.configUrl +
      '/api/clues?offset=' + offset + '&value=' + value +
                      '&min_date=' + min_date + '&max_date=' + max_date + 
                      '&category=' + category);
  }
}