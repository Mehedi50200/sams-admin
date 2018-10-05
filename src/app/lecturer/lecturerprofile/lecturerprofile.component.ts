import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from '../../services/lecturer.service';
import { AssignedCourse } from '../lecturerassignedcourse';
import { LecturerProfile } from './lecturerprofile';
import { Observable } from 'rxjs';
import { Lecturer } from '../lecturer';

@Component({
  selector: 'app-lecturerprofile',
  templateUrl: './lecturerprofile.component.html',
  styleUrls: ['./lecturerprofile.component.css']
})
export class LecturerprofileComponent implements OnInit {

  assignedCourseList: AssignedCourse[];
  private routeSub: any;
  userId: string;
  userName: string;
  userEmail: string;
  userProfileImageUrl: string;
  lecturerProfile: Observable<any>;
  

  constructor(private route: ActivatedRoute, private lecturerService: LecturerService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      this.userId = params['userid'];

    });

    this.userName = this.lecturerService.selectedLecturer.userName;
    this.userEmail = this.lecturerService.selectedLecturer.userEmail;
    this.userProfileImageUrl = this.lecturerService.selectedLecturer.userProfileImageUrl;

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

  

}
