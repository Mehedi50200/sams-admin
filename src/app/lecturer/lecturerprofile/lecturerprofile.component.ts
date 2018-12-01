import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from '../../services/lecturer.service';
import { AssignedCourse } from '../lecturerassignedcourse';
import { LecturerProfile } from './lecturerprofile';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-lecturerprofile',
  templateUrl: './lecturerprofile.component.html',
  styleUrls: ['./lecturerprofile.component.css'],
})
export class LecturerprofileComponent implements OnInit {

  assignedCourseList: AssignedCourse[];

  lecturerProfileObservable: Observable<any>;
  private routeSub: any;
  userId: string;
  userName: string;
  userEmail: string;
  userProfileImageUrl: string;
  lecturerProfile: LecturerProfile[];

  assignedCourseKey: string;
  
  

  constructor(public route: ActivatedRoute, public lecturerService: LecturerService, public toastr: ToastrService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['userid'];
    });

    this.lecturerProfileObservable = this.lecturerService.getLecturerProfile(this.userId).valueChanges();

    var p = this.lecturerService.getLecturerProfile(this.userId);
    p.snapshotChanges().subscribe(action => {
      //  console.log(action.type);
      this.lecturerProfile = [];
      var q = action.payload.toJSON();
      this.lecturerProfile.push(q as LecturerProfile);
      
    });
   

    
    var x = this.lecturerService.getAssignedCourse(this.userId);
    x.snapshotChanges().subscribe(item => {
      this.assignedCourseList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.assignedCourseList.push(y as AssignedCourse);
      });
    });
      
  }  

  onCourseUnasssigned(key: string) {
    if (confirm('Are You Sure to Delete this Course') == true) {
      this.lecturerService.deleteAssignedCourse(key);
      this.toastr.success('Course Deleted Successfully', 'Course Deleted');
    }
  }

  
  resetForm(form : NgForm){
    if (form != null)
      form.reset();

    this.lecturerService.selectedAssignedCourse = {
      $key : '',
      CourseCode : '',
      CourseName : '',
      CourseCredit: '',
      Url: '',
      Day: '',
      Time: '',
    }
  }

  onCourseAsssignedEdit(asignedcrs: AssignedCourse) {
    this.lecturerService.selectedAssignedCourse = Object.assign({},asignedcrs);
  }


  onUpdateAssignedCourse(form?: NgForm) {
    this.lecturerService.updateAssignedCourse(form.value);
    this.resetForm(form);
    this.toastr.success('Course Updated Successfully', 'Course Updated');
  }

  onLecturerSelect(lecturer){
    this.lecturerService.selectedLecturer = Object.assign({},lecturer);
  }

}
