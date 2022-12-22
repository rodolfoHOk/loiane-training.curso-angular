import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExternalLibsComponent } from './test-external-libs.component';

describe('TestExternalLibsComponent', () => {
  let component: TestExternalLibsComponent;
  let fixture: ComponentFixture<TestExternalLibsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExternalLibsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestExternalLibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
