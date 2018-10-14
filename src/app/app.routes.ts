import { Routes, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { LecturerprofileComponent } from './lecturer/lecturerprofile/lecturerprofile.component';
import { LecturerenrolledstudentlistComponent } from './lecturer/lecturerenrolledstudentlist/lecturerenrolledstudentlist.component';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';


export const appRoutes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'course', component: CourseComponent},
  { path: 'student', component: StudentComponent },
  { path: 'lecturer/:userid/:coursecode', component: LecturerenrolledstudentlistComponent },
  { path: 'lecturer/:userid', component: LecturerprofileComponent },
  { path: 'lecturer', component: LecturerComponent },

]
