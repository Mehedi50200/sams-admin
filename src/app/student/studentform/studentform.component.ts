import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})

export class StudentformComponent implements OnInit {

 // selectedFiles: FileList;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<any>;

  constructor(private studentService: StudentService, private toastr: ToastrService, private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  onStudentSubmit(form?: NgForm)
  {   
    this.studentService.insertStudent(form.value);  
  //  const file = this.selectedFiles.item(0);
  //  this.startUpload(file);
   
    this.resetForm(form);
    this.toastr.success('New Student Added Successfully', 'Student Added');
  }

  resetForm(form : NgForm){
    if (form != null)
      form.reset();

    this.studentService.selectedStudent = {
      $key : '',
      StudentMatric : '',
      StudentName : '',
      StudentProgram: '',
      StudentProfileImageUrl: '',
    }
  }


  onStudentUpdate(form?: NgForm) {
    this.studentService.updateStudent(form.value);
    this.resetForm(form);
    this.toastr.success('Student Updated Successfully', 'Student Updated');
  }

  /* image Upload */

  /* selectFile(event) {
      this.selectedFiles = event.target.files;
    }
    
    */ 
  startUpload(event: FileList/*file:File*/) {

    const file = event.item(0);


    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `StudentsPic/`+ this.studentService.selectedStudent.StudentMatric;
    this.task = this.storage.upload(path, file);

    // Progress monitoring
    this.percentage = this.task.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    console.log(this.percentage);
    this.snapshot   = this.task.snapshotChanges();
   // const x= this.task.snapshotChanges().pipe(
     //             finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
       //           ).subscribe();    
  } 

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
  

}
