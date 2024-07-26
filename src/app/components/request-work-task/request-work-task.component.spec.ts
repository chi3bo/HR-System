import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWorkTaskComponent } from './request-work-task.component';

describe('RequestWorkTaskComponent', () => {
  let component: RequestWorkTaskComponent;
  let fixture: ComponentFixture<RequestWorkTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestWorkTaskComponent]
    });
    fixture = TestBed.createComponent(RequestWorkTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
