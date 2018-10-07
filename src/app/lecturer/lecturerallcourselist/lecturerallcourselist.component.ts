import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../course/course';
import { ToastrService } from 'ngx-toastr';
import { LecturerService} from '../../services/lecturer.service'
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lecturerallcourselist',
  templateUrl: './lecturerallcourselist.component.html',
  styleUrls: ['./lecturerallcourselist.component.css']
})
export class LecturerallcourselistComponent implements OnInit {
  
  courseList: Course[];
  userId: string;
  private routeSub: any;
  constructor(private route: ActivatedRoute, private courseService: CourseService, private lecturerService: LecturerService, private toastr: ToastrService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['userid'];
    });
    

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

  onAssign(form?: NgForm)
  {
    this.lecturerService.assignCourse(form.value, this.userId);
    console.log(form.value);
    this.toastr.success('Course Added Successfully', 'Course Added');
    this.resetForm(form);
  }

 
  resetForm(form : NgForm){
    if (form != null)
      form.reset();

    this.lecturerService.selectedCourse = {
      $key: '',
      CourseCode : '',
      CourseName : '',
      CourseCredit: '',
      Url: '',
    }
  }

  onCourseSelected(course: Course){
    this.lecturerService.selectedCourse= Object.assign({}, course); 
    console.log(this.lecturerService.selectedCourse);
  }

}
