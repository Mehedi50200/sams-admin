import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../student';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  studentList: Student[];   
  constructor(private studentService: StudentService, private toastr: ToastrService) { }

  ngOnInit() {
    var x= this.studentService.getStudent();
    x.snapshotChanges().subscribe(item =>{
      this.studentList = [];
      item.forEach(element =>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.studentList.push(y as Student);
      });
    });
  }

  onItemClick(student : Student){
    this.studentService.selectedStudent= Object.assign({}, student); 
  }


  onDelete(key: string) {
    if (confirm('Are You Sure to Delete this Course') == true) {
      this.studentService.deleteStudent(key);
      this.toastr.success('Student Deleted Successfully', 'Student Deleted');
    }
  }

  onEdit(student: Student) {
    this.studentService.selectedStudent= Object.assign({},student);
  }
}
