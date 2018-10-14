import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../student/student';
import { ToastrService } from 'ngx-toastr';
import { LecturerService} from '../../services/lecturer.service'
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lecturerallstudentlist',
  templateUrl: './lecturerallstudentlist.component.html',
  styleUrls: ['./lecturerallstudentlist.component.css']
})
export class LecturerallstudentlistComponent implements OnInit {

  studentList: Student[];
  userId: string;
  private routeSub: any;
  constructor(private route: ActivatedRoute, private studentService: StudentService, private lecturerService: LecturerService, private toastr: ToastrService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['userid'];
    });
    

    var x = this.studentService.getStudent();
    x.snapshotChanges().subscribe(item => {
      this.studentList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.studentList.push(y as Student);
      });
    });
  }


  onEnrol(student)
  {
    this.lecturerService.enrolStudent(student);
    this.toastr.success('Student enrolled Successfully', 'Student Added');
  }

  onStudentSelected(student: Student){
    this.lecturerService.selectedStudent= Object.assign({}, student); 
  }

}
