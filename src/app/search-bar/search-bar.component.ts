import { Component, OnInit } from '@angular/core';
import { ClientService } from '../api-client/client.service';
import { FormControl } from '@angular/forms';
import { Category } from '../category/category';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searControl = new FormControl();
  options: Category[] = [];
  difficulties: number[] = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
  ];

  constructor(private clientService:ClientService) { }

  ngOnInit() {
    this.clientService.getCategory(100, 100)
    .subscribe(data => {
      data.forEach(category => {
        this.options.push(category);
      })
    });
  }

  displayFn(category?: Category): string | undefined {
    return category ? category.title : undefined;
  }
}
