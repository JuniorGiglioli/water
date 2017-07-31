import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDebitComponent } from './debit-form.component';

describe('FormDebitComponent', () => {
  let component: FormDebitComponent;
  let fixture: ComponentFixture<FormDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
