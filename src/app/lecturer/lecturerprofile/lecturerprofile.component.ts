import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from '../../services/lecturer.service';
import { AssignedCourse } from '../lecturerassignedcourse/lecturerassignedcourse';

@Component({
  selector: 'app-lecturerprofile',
  templateUrl: './lecturerprofile.component.html',
  styleUrls: ['./lecturerprofile.component.css']
})
export class LecturerprofileComponent implements OnInit {

  assignedCourseList: AssignedCourse[];
  private routeSub: any;
  userId: string;

  constructor(private route: ActivatedRoute, private lecturerService: LecturerService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      this.userId = params['userid'];
      console.log(this.userId);

    });
    console.log(this.userId);
    var x = this.lecturerService.getAssignedCourse(this.userId);
    console.log(x);
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
