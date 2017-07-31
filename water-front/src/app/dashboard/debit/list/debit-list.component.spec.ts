import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDebitComponent } from './list-debit.component';

describe('ListDebitComponent', () => {
  let component: ListDebitComponent;
  let fixture: ComponentFixture<ListDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
