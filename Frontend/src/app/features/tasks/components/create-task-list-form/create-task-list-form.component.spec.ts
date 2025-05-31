import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskListFormComponent } from './create-task-list-form.component';

describe('CreateTaskListFormComponent', () => {
  let component: CreateTaskListFormComponent;
  let fixture: ComponentFixture<CreateTaskListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskListFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTaskListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
