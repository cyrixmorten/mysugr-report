import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysugrTableComponent } from './mysugr-table.component';

describe('DtMysugrTableComponent', () => {
  let component: MysugrTableComponent;
  let fixture: ComponentFixture<MysugrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysugrTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysugrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
