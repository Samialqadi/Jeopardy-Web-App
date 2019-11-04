import { Component, OnInit } from '@angular/core';
import { ClientService } from '../api-client/client.service';
import { FormControl } from '@angular/forms';
import { Category } from '../category/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searControl = new FormControl();

  options: Category[] = [];
  difficulties: number[] = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
  ];

  chosenCategory: Category;
  minDate: Date;
  maxDate: Date;
  difficultyValue: number;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.clientService.getCategory(100, 100)
      .subscribe(categories => {
        categories.forEach(category => {
          this.options.push(category);
        })
      });
  }

  displayFn(category?: Category): string | undefined {
    return category ? category.title : undefined;
  }

  onSubmit() {
    let maybeMinDate = '1950-01-01';
    let maybeMaxDate = new Date().toISOString();
    let maybeChosenCategory = 0;

    if (this.minDate) {
      maybeMinDate = this.minDate.toISOString();
    }
    if (this.maxDate) {
      maybeMaxDate = this.maxDate.toISOString();
    }

    if (this.chosenCategory) {
      maybeChosenCategory = this.chosenCategory.id;
    }

    let navigationArr = ['/question', maybeChosenCategory, maybeMinDate,
      maybeMaxDate, this.difficultyValue || 0]
    this.router.navigate(navigationArr);
  }
}
