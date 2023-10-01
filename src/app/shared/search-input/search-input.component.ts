import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  faSearch = faSearch

  @Input() realTime: boolean = false
  @Input() initialSearchTerm: string = ''
  @Output() queryEmitter = new EventEmitter<string>()
  searchForm = this.fb.group({
    searchTerm: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]]
  })
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm.setValue({searchTerm: this.initialSearchTerm})
  }

  emitSearchQuery() {
    if (this.searchForm.valid) {
      return this.queryEmitter.emit(this.searchForm.value.searchTerm!)
    }
  }
}
