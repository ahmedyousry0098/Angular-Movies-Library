import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  faSearch = faSearch

  @Output() queryEmitter = new EventEmitter<string>()
  searchTerm: string = ""
  
  constructor() {}

  emitSearchQuery() {
    return this.queryEmitter.emit(this.searchTerm)
  }

}
