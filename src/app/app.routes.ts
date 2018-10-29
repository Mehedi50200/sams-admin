import { Routes, CanActivate } from '@angular/router';
import { AuthGuard} from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { LecturerprofileComponent } from './lecturer/lecturerprofile/lecturerprofile.component';
import { LecturerenrolledstudentlistComponent } from './lecturer/lecturerenrolledstudentlist/lecturerenrolledstudentlist.component';


export const appRoutes: Routes = [ 
 
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'course', component: CourseComponent,
    canActivate: [AuthGuard]
  },
  { path: 'student', component: StudentComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'lecturer/:userid/:coursecode', component: LecturerenrolledstudentlistComponent,
    canActivate: [AuthGuard]
  },
  { path: 'lecturer/:userid', component: LecturerprofileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'lecturer', component: LecturerComponent,
    canActivate: [AuthGuard]
  },
  
]
