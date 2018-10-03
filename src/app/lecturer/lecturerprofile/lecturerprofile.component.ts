import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lecturerprofile',
  templateUrl: './lecturerprofile.component.html',
  styleUrls: ['./lecturerprofile.component.css']
})
export class LecturerprofileComponent implements OnInit, OnDestroy {

  private routeSub: any;
  userId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub= this.route.params.subscribe(params => {
      console.log(params);
      this.userId = params['$key']
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubsribe()
  }

}
