import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../course/course';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lecturerallcourselist',
  templateUrl: './lecturerallcourselist.component.html',
  styleUrls: ['./lecturerallcourselist.component.css']
})
export class LecturerallcourselistComponent implements OnInit {
  courseList: Course[];
  constructor(private courseService: CourseService, private toastr: ToastrService) { }

  ngOnInit() {
    var x = this.courseService.getCourses();
    x.snapshotChanges().subscribe(item => {
      this.courseList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.courseList.push(y as Course);
      });
    });
  }

}
