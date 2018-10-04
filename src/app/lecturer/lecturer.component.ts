import { Component, OnInit } from '@angular/core';
import { LecturerService } from '../services/lecturer.service';
import { Lecturer } from './lecturer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent implements OnInit {

  lecturerList: Lecturer[];
  constructor(private lecturerService: LecturerService, private toastr: ToastrService) { }

  ngOnInit() {
    var x = this.lecturerService.getLecturers();
    console.log(x);
    x.snapshotChanges().subscribe(item => {
      this.lecturerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.lecturerList.push(y as Lecturer);
      });
    });

  }

}
