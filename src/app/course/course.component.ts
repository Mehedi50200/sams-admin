import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { CourseService } from '../services/course.service';

class Course {
    constructor(public course) { }
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html', 
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
 
  public courses: Observable<any[]>;
  constructor(private courseservice: CourseService) { }

  ngOnInit() {
    this.courses = this.getCourses('/Courses');
  }
  getCourses(path) {
    return this.courseservice.getCourses(path);
  }

}
