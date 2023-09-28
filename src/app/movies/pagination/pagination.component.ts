import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  currentPage: number = 1
  @Input() collectionSize!: number
  @Input() pageSize!: number
  @Output() pageEmitter = new EventEmitter<number>()

  sendPageNumber(page: number) {
    return this.pageEmitter.emit(page)
  }
}
