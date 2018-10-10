import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent implements OnInit {

  constructor(private studentService: StudentService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onStudentSubmit(form?: NgForm)
  {
    this.studentService.insertStudent(form.value);
    this.resetForm(form);
    this.toastr.success('New Student Added Successfully', 'Student Added');
  }

  resetForm(form : NgForm){
    if (form != null)
      form.reset();

    this.studentService.selectedStudent = {
      $key : '',
      StudentMatric : '',
      StudentName : '',
      StudentProgram: '',
      Url: '',
    }
  }

  onStudentUpdate(form?: NgForm) {
    this.studentService.updateStudent(form.value);
    this.resetForm(form);
    this.toastr.success('Student Updated Successfully', 'Student Updated');
  }

}
