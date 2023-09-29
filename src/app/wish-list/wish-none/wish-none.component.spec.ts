import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishNoneComponent } from './wish-none.component';

describe('WishNoneComponent', () => {
  let component: WishNoneComponent;
  let fixture: ComponentFixture<WishNoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishNoneComponent]
    });
    fixture = TestBed.createComponent(WishNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
