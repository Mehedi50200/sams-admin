import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../services/course';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-courseform',
  templateUrl: './courseform.component.html',
  styleUrls: ['./courseform.component.css']
})
export class CourseformComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  ngOnInit() {
  }
    
  onSubmit(form?: NgForm)
  {
    this.courseService.insertCourse(form.value);
    this.resetForm(form);
  }

  onUpdate(form?: NgForm)
  {
    this.courseService.updateCourse(form.value);
    this.resetForm(form);
  }

  resetForm(form : NgForm){
    if (form != null)
        form.reset();
    this.courseService.selectedCourse = {
      $key : '';
      CourseCode : '';
      CourseName : '';
      CourseCredit : ''; 
    }
  }

  onDelete(form : NgForm){
    if(confirm('Are You Sure to Delete this Course')==true){
      this.courseService.deleteCourse(form.value.$key);
      this.resetForm(form);
    }
  }

  
}
