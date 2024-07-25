import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkTaskComponent } from './admin-work-task.component';

describe('AdminWorkTaskComponent', () => {
  let component: AdminWorkTaskComponent;
  let fixture: ComponentFixture<AdminWorkTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminWorkTaskComponent]
    });
    fixture = TestBed.createComponent(AdminWorkTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
