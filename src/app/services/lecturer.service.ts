import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Lecturer } from '../lecturer/lecturer';
import { LecturerProfile } from '../lecturer/lecturerprofile/lecturerprofile'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LecturerService {

  lecturerList: AngularFireList<any>;
  assignedCourseList: AngularFireList<any>;
  lecturerProfile: AngularFireList<any>;



  selectedLecturer: Lecturer = new Lecturer();

  constructor(private db: AngularFireDatabase) { }

  getLecturers() {
    this.lecturerList = this.db.list('Users');
    return this.lecturerList;
  }

  
  getLecturerProfile(userId: string) {
    this.lecturerProfile = this.db.list('Users/' + userId)
    return this.lecturerProfile;    
  }

  getAssignedCourse(userId: string) {
    this.assignedCourseList = this.db.list('Users/' + userId + '/Course')
    return this.assignedCourseList;
  }

}
