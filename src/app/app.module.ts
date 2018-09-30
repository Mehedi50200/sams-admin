import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';


import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {FormsModule} from '@angular/forms'


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';

import {CourseService} from './services/course.service';
import { CourseformComponent } from './course/courseform/courseform.component';
import { CourselistComponent } from './course/courselist/courselist.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    LecturerComponent,
    CourseComponent,
    StudentComponent,
    CourseformComponent,
    CourselistComponent,   
  ],

  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: false}),
    AngularFireModule.initializeApp(environment.firebase, 'StudentAttendanceMonitoringSystemFrontend'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule

  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})

export class AppModule { }
