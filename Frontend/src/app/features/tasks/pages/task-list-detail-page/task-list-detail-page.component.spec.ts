import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListDetailPageComponent } from './task-list-detail-page.component';

describe('TaskListDetailPageComponent', () => {
  let component: TaskListDetailPageComponent;
  let fixture: ComponentFixture<TaskListDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
