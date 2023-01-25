import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorMsgComponent } from './field-error-msg.component';

describe('FieldErrorMsgComponent', () => {
  let component: FieldErrorMsgComponent;
  let fixture: ComponentFixture<FieldErrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldErrorMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
