import { Component, OnInit } from '@angular/core';


class Course {
    constructor(public course) { }
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html', 
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

}


