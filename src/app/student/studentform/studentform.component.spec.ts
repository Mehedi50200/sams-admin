import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentformComponent } from './studentform.component';

describe('StudentformComponent', () => {
  let component: StudentformComponent;
  let fixture: ComponentFixture<StudentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
