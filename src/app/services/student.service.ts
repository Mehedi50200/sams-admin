import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Student } from '../student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentList : AngularFireList <any>;
  selectedStudent: Student = new Student ();

  constructor(private db: AngularFireDatabase) { }

  getStudent(){
    this.studentList= this.db.list('Students');
    return this.studentList;
  }

  insertStudent(student: Student){
    this.studentList.push({
      StudentMatric: student.StudentMatric,
      StudentName: student.StudentName,
      StudentProgram: student.StudentProgram,
      StudentProfileImageUrl: student.StudentProfileImageUrl,
    });
  }

  updateStudent(student: Student){
    this.studentList.update(student.$key,{
      StudentMatric: student.StudentMatric,
      StudentName: student.StudentName,
      StudentProgram: student.StudentProgram,
    });
  }

  deleteStudent(key: string){
    this.studentList.remove(key);
  }

}

