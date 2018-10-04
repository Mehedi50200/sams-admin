import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Lecturer } from '../lecturer/lecturer';
import { AssignedCourse } from '../lecturer/lecturerassignedcourse/lecturerassignedcourse';


@Injectable({
  providedIn: 'root'
})



export class LecturerService {

  lecturerList: AngularFireList<any>;
  assignedCourseList: AngularFireList<any>;
  selectedLecturer: Lecturer = new Lecturer();
  selectedAssignedCourse: AssignedCourse = new AssignedCourse();

  constructor(private db: AngularFireDatabase) { }

  getLecturers() {
    this.lecturerList = this.db.list('Users');
    return this.lecturerList;
  }

  getAssignedCourse(userId: string) {
    this.assignedCourseList = this.db.list('Users/' + userId + '/Course')
    return this.assignedCourseList;

  }

}
