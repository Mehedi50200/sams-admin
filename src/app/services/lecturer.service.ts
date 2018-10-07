import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Lecturer } from '../lecturer/lecturer';
import { Course } from '../course/course';
import { AssignedCourse } from '../lecturer/lecturerassignedcourse';


@Injectable({
  providedIn: 'root'
})

export class LecturerService {

  lecturerList: AngularFireList<any>;
  assignedCourseList: AngularFireList<any>;
  lecturerProfile: AngularFireObject<any>;



  selectedLecturer: Lecturer = new Lecturer();
  selectedCourse: Course = new Course();
  selectedAssignedCourse: AssignedCourse = new AssignedCourse();

  constructor(private db: AngularFireDatabase) { }

  getLecturers() {
    this.lecturerList = this.db.list('Users');
    return this.lecturerList;
  }


  getLecturerProfile(userId: string){
    this.lecturerProfile = this.db.object('Users/' + userId);
    return this.lecturerProfile;
  }


  getAssignedCourse(userId: string) {
    this.assignedCourseList = this.db.list('Users/' + userId + '/Course');
    return this.assignedCourseList;
  }

  assignCourse(course: AssignedCourse, userId){
    this.assignedCourseList.update(course.CourseCode,{
      CourseName: course.CourseName,
      CourseCredit: course.CourseCredit,
    });
    this.assignedCourseList.update('/'+ course.CourseCode+'/Routine',{
      Day: course.Day,
      Time: course.Time,
    });
  }

  updateAssignedCourse(course: AssignedCourse){
    this.assignedCourseList.update(course.CourseCode,{
      CourseName: course.CourseName,
      CourseCredit: course.CourseCredit,
    });
    this.assignedCourseList.update('/'+ course.CourseCode+'/Routine',{
      Day: course.Day,
      Time: course.Time,
    });
  }

  deleteAssignedCourse(key: string){
    this.assignedCourseList.remove(key);
  }

}
