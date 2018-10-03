import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Lecturer } from '../lecturer/lecturer';

@Injectable({
  providedIn: 'root'
})



export class LecturerService {

  lecturerList: AngularFireList<any>;
  selectedLecturer: Lecturer = new Lecturer();

  constructor(private db: AngularFireDatabase) { }

  getLecturers() {
    this.lecturerList = this.db.list('Users');
    return this.lecturerList;
  }






}
