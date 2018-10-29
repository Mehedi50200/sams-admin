import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Admin } from '../admin/admin';
import { Observable } from 'rxjs';
import { Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  AdminObservable: Observable<any>;
  userId: string;
  userName: string;
  userEmail: string;
  userProfileImageUrl: string;
  adminProfile: Admin[];


  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit() {
    this.AdminObservable = this.authService.currentUserProfile(this.authService.currentUserId).valueChanges();
    var p = this.authService.currentUserProfile(this.authService.currentUserId);
    p.snapshotChanges().subscribe(action => {
      //  console.log(action.type);
      this.adminProfile = [];
      var q = action.payload.toJSON();
      this.adminProfile.push(q as Admin);      
    }); 
  }

  SignOut(){
    console.log("logout");
    this.authService.signOut();
  }

}
