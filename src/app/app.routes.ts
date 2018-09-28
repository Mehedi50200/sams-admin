import { Routes, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';



export const appRoutes: Routes = [
   
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'lecturer', component: LecturerComponent},
    { path: 'course', component: CourseComponent},
    { path: 'student', component: StudentComponent}

]
