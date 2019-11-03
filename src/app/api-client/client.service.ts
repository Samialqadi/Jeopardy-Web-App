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
    let apiString = this.configUrl + '/api/clues';
    let firstAdd = true;
    if (offset) {
      if (firstAdd) {
        apiString += '?offset=' + offset;
        firstAdd = false;
      }
      else apiString += '&offset=' + offset
    } 
    if (value) {
      if (firstAdd) {
        apiString += '?value=' + value;
        firstAdd = false;
      }
      else apiString += '&value=' + value
    } 
    if (min_date) {
      if (firstAdd) {
        apiString += '?min_date=' + min_date;
        firstAdd = false;
      }
      else apiString += '&min_date=' + min_date
    } 
    if (max_date) {
      if (firstAdd) {
        apiString += '?max_date=' + max_date;
        firstAdd = false;
      }
      else apiString += '&max_date=' + max_date
    }
    if (category != 0) {
      if (firstAdd) {
        apiString += '?category=' + category;
        firstAdd = false;
      }
      else apiString += '&category=' + category
    } 

    return this.http.get<Question[]>(apiString);
  }
}