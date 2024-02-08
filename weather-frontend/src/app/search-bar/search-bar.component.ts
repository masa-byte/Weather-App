import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import * as ProductActions from '../store/actions/product.actions';
import { Category } from '../product/models/category';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {

  searchControl = new FormControl();
  selectedParameter: string = "noCriteria";
  selectedOrder: string = "desc";
  selectedCategories: string[] = [];

  categories = Object.values(Category);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.search(value);
      });
  }

  search(searchText: string = '') {
    let selectedOrder = this.selectedOrder === "desc" ? false : true;

    this.store.dispatch(ProductActions.sortProducts({
      sortingCriteria: this.selectedParameter,
      sortAscending: selectedOrder,
      selectedCategories: this.selectedCategories,
      searchText: searchText
    }));
  }

  updateSelectedCategories(category: string, event: any) {
    if (event.checked && !this.selectedCategories.includes(category)) {
      this.selectedCategories = [...this.selectedCategories, category];
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    }
  }
}
