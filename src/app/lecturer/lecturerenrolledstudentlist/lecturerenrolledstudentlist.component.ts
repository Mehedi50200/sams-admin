import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from '../../services/lecturer.service';
import { LecturerProfile } from '../lecturerprofile/lecturerprofile';
import { AssignedCourseObject } from './lecturerassignedcourseobject';
import { EnrolledStudent } from '../lecturerenrolledstudent';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-lecturerenrolledstudentlist',
  templateUrl: './lecturerenrolledstudentlist.component.html',
  styleUrls: ['./lecturerenrolledstudentlist.component.css'],
})

export class LecturerenrolledstudentlistComponent implements OnInit {
  lecturerProfileObservable: Observable<any>;
  assignedCourseObservable: Observable<any>;
  enrolledStudentList: EnrolledStudent[];
  private routeSub: any;
  userId: string;
  courseCode: string;
  lecturerProfile: LecturerProfile[];
  assignedCourseObject: AssignedCourseObject[];


  constructor(private route: ActivatedRoute, private lecturerService: LecturerService, private toastr: ToastrService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['userid'];
      this.courseCode = params['coursecode'];
    });

    this.lecturerProfileObservable = this.lecturerService.getLecturerProfile(this.userId).valueChanges();
    this.assignedCourseObservable = this.lecturerService.getSelectedAssignedCourse(this.userId, this.courseCode).valueChanges();

    var p = this.lecturerService.getLecturerProfile(this.userId);
    p.snapshotChanges().subscribe(action => {
      //  console.log(action.type);
      this.lecturerProfile = [];
      var q = action.payload.toJSON();
      this.lecturerProfile.push(q as LecturerProfile);
      
    });

    var scourse = this.lecturerService.getSelectedAssignedCourse(this.userId, this.courseCode);
    scourse.snapshotChanges().subscribe(action => {
      //  console.log(action.type);
      this.assignedCourseObject = [];
      var m = action.payload.toJSON();
      this.assignedCourseObject.push(m as AssignedCourseObject);
      
    });

    
    var s = this.lecturerService.getEnrolledStudent(this.userId, this.courseCode);
    s.snapshotChanges().subscribe(item => {
      this.enrolledStudentList = [];
      item.forEach(element => {
        var es = element.payload.toJSON();
        es["$key"] = element.key;
        this.enrolledStudentList.push(es as EnrolledStudent);
      });
    });


  }
  
  onUnenrol(key: string) {
    if (confirm('Are You Sure to Unenrol this Student from this Course') == true) {
      this.lecturerService.unenrolStudent(key);
      this.toastr.success('Course Deleted Successfully', 'Course Deleted');
    }
  }

}
