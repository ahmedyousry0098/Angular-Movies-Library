import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    SearchInputComponent
  ]
})
export class SharedModule { }
