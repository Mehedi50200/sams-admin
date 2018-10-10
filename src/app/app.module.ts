import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CourseComponent } from './course/course.component';
import { CourseformComponent } from './course/courseform/courseform.component';
import { CourselistComponent } from './course/courselist/courselist.component';

import { StudentComponent } from './student/student.component';
import { StudentformComponent } from './student/studentform/studentform.component';
import { StudentlistComponent } from './student/studentlist/studentlist.component';


import { LecturerComponent } from './lecturer/lecturer.component';
import { LecturerprofileComponent } from './lecturer/lecturerprofile/lecturerprofile.component';
import { LecturerallcourselistComponent } from './lecturer/lecturerallcourselist/lecturerallcourselist.component';

import { CourseService } from './services/course.service';
import { LecturerService } from './services/lecturer.service';
import { StudentService } from './services/student.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    CourseComponent,
    StudentComponent,
    CourseformComponent,
    CourselistComponent,
    LecturerComponent,
    LecturerprofileComponent,
    LecturerallcourselistComponent,
    StudentformComponent,
    StudentlistComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: false}),
    AngularFireModule.initializeApp(environment.firebase, 'StudentAttendanceMonitoringSystemFrontend'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ToastrModule.forRoot(),

  ],
  providers: [CourseService, LecturerService, StudentService],
  bootstrap: [AppComponent]
})

export class AppModule { }
