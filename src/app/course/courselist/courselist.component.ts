import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../services/course';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})

export class CourselistComponent implements OnInit {
  courseList: Course[];
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    var x= this.courseService.getCourses();
    x.snapshotChanges().subscribe(item =>{
      this.courseList = [];
      item.forEach(element =>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.courseList.push(y as Course);
      });
    });
  }

  onItemClick(crs : Course){
    this.courseService.selectedCourse= Object.assign({}, crs); 
  }
}
