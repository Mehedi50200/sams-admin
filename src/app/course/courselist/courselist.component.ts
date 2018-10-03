import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../course';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})


export class CourselistComponent implements OnInit {
  courseList: Course[];   
  constructor(private courseService: CourseService, private toastr: ToastrService) { }


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


  onDelete(key: string) {
    if (confirm('Are You Sure to Delete this Course') == true) {
      this.courseService.deleteCourse(key);
      this.toastr.success('Course Deleted Successfully', 'Course Deleted');
    }
  }

  onEdit(crs: Course) {
    this.courseService.selectedCourse = Object.assign({},crs);
  }


}
