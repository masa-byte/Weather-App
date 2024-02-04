import { Component, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-city-bar',
  templateUrl: './search-city-bar.component.html',
  styleUrls: ['./search-city-bar.component.scss']
})
export class SearchCityBarComponent {

  searchControl = new FormControl();
  @Output() cityName = new EventEmitter<string>();

  constructor() { }

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

  search(cityName: string = '') {
    this.cityName.emit(cityName);
  }
}
