import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from '../../services/lecturer.service';
import { AssignedCourse } from '../lecturerassignedcourse';
import { LecturerProfile } from './lecturerprofile';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-lecturerprofile',
  templateUrl: './lecturerprofile.component.html',
  styleUrls: ['./lecturerprofile.component.css']
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
  
  

  constructor(private route: ActivatedRoute, private lecturerService: LecturerService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      this.userId = params['userid'];

    });

    this.lecturerProfileObservable = this.lecturerService.getLecturerProfile(this.userId).valueChanges();

    var p = this.lecturerService.getLecturerProfile(this.userId);
    p.snapshotChanges().subscribe(action => {
      //  console.log(action.type);
      this.lecturerProfile = [];
      console.log(action.key)
      console.log(action.payload.val())
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

}
