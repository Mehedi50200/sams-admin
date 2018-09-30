import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Course } from './course.ts';


@Injectable()
export class CourseService {

  courseList : AngularFireList <any>;

  selectedCourse: Course = new Course ();

  constructor(private db: AngularFireDatabase) { }

  getCourses(){
    this.courseList= this.db.list('Courses');
    return this.courseList;
  }

  insertCourse(course: Course){
    this.courseList.push({
      CourseCode: course.CourseCode;
      CourseName: course.CourseName;
      CourseCredit: course.CourseCredit;
    });
  }

  updateCourse(course: Course){
    this.courseList.update(course.$key,{
      CourseCode: course.CourseCode;
      CourseName: course.CourseName;
      CourseCredit: course.CourseCredit;
    });
  }

  deleteCourse(key: string){
    this.courseList.remove(key);
  }


}
