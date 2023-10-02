import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() currentPage!: number
  @Input() collectionSize!: number
  @Input() pageSize!: number
  @Output() pageEmitter = new EventEmitter<number>()

  ngOnInit() {
    console.log(this.currentPage);
    
  }

  sendPageNumber(page: number) {
    return this.pageEmitter.emit(page)
  }
}
