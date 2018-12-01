import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-courseform',
  templateUrl: './courseform.component.html',
  styleUrls: ['./courseform.component.css']
})

export class CourseformComponent implements OnInit {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<any>;

  constructor(public courseService: CourseService, public toastr: ToastrService, public storage: AngularFireStorage, public db: AngularFireDatabase) { }

  
  ngOnInit() {
  }
    
  onSubmit(form?: NgForm)
  {
    this.courseService.insertCourse(form.value);
    this.resetForm(form);
    this.toastr.success('Course Added Successfully', 'Course Added');
  }

 
  resetForm(form : NgForm){
    if (form != null)
      form.reset();

    this.courseService.selectedCourse = {
      $key : '',
      CourseCode : '',
      CourseName : '',
      CourseCredit: '',
      Url: '',
      Day:'',
      Time:'',
    }
  }

  onUpdate(form?: NgForm) {
    this.courseService.updateCourse(form.value);
    this.resetForm(form);
    this.toastr.success('Course Updated Successfully', 'Course Updated');
  }



  startUpload(event: FileList/*file:File*/) {

    const file = event.item(0);


    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `CoursePic/`+ this.courseService.selectedCourse.CourseCode;
    this.task = this.storage.upload(path, file);

    // Progress monitoring
    this.percentage = this.task.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    console.log(this.percentage);
    this.snapshot   = this.task.snapshotChanges();
    const x= this.task.snapshotChanges().pipe(
                 finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
               ).subscribe();    
  } 

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

    
}
