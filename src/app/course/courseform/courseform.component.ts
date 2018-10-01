import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courseform',
  templateUrl: './courseform.component.html',
  styleUrls: ['./courseform.component.css']
})

export class CourseformComponent implements OnInit {

  constructor(private courseService: CourseService, private toastr: ToastrService) { }

  ngOnInit() {
  }
    
  onSubmit(form?: NgForm)
  {
    this.courseService.insertCourse(form.value);
    this.resetForm(form);
    this.toastr.success('Course Added Successfully', 'Course Added');
  }

 
  resetForm(form : NgForm){
    if (form != null)
        form.reset();
    this.courseService.selectedCourse = {
      $key : '',
      CourseCode : '',
      CourseName : '',
      CourseCredit : '', 
    }
  }

  onUpdate(form?: NgForm) {
    this.courseService.updateCourse(form.value);
    this.resetForm(form);
    this.toastr.success('Course Updated Successfully', 'Course Updated');
  }

    
}
