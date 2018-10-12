import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Lecturer } from '../lecturer/lecturer';
import { Course } from '../course/course';
import { Student } from '../student/student';
import { AssignedCourse } from '../lecturer/lecturerassignedcourse';
import { EnrolledStudent } from '../lecturer/lecturerenrolledstudent';


@Injectable({
  providedIn: 'root'
})

export class LecturerService {

  lecturerList: AngularFireList<any>;
  assignedCourseList: AngularFireList<any>;
  enrolledStudentList: AngularFireList<any>;
  lecturerProfile: AngularFireObject<any>;
  assignedCourseObject: AngularFireObject <any>



  selectedLecturer: Lecturer = new Lecturer();
  selectedCourse: Course = new Course();
  selectedStudent: Student = new Student();
  selectedAssignedCourse: AssignedCourse = new AssignedCourse();
  selectedEnrolledStudent: EnrolledStudent = new EnrolledStudent();

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

  
  getSelectedAssignedCourse(userId:string, courseCode: string) {
    this.assignedCourseObject = this.db.object('Users/' + userId + '/Course/'+ courseCode);
    return this.assignedCourseObject;
  }

  /*------------------- Assign Course --------------------- */

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

  /*------------------- Enroll Student --------------------- */

  getEnrolledStudent(userId:string, coursecode:string){
    this.enrolledStudentList = this.db.list('Users/' + userId + '/Course/'+ coursecode +'/Students');
    return this.enrolledStudentList; 
  }

  
  enrolStudent(student: EnrolledStudent){
    this.enrolledStudentList.update(student.StudentMatric,{
      StudentName: student.StudentName,
      StudentProgram: student.StudentProgram,
      StudentProfileImageUrl: student.StudentProfileImageUrl,
    });  
  }

  unenrolStudent(key: string){
    this.enrolledStudentList.remove(key);
  }

}
