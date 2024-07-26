import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpWorkTaskComponent } from './emp-work-task.component';

describe('EmpWorkTaskComponent', () => {
  let component: EmpWorkTaskComponent;
  let fixture: ComponentFixture<EmpWorkTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpWorkTaskComponent]
    });
    fixture = TestBed.createComponent(EmpWorkTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
