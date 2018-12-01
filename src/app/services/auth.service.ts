import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  adminProfile: AngularFireObject<any>;
  constructor(private toastr: ToastrService,private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }


 
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }
 
  get currentUserEmail(): string {
    return this.authState['email']
  }

  currentUserProfile(userId: string){
    this.adminProfile = this.db.object('Admin/' + userId );
    return this.adminProfile;
  }
 
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
 
  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null) {
      return true
    } else {
      return false
    }
  }
 
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        this.toastr.warning(error, 'Authentication Error');
        throw error
      });
  }
 
  signOut(): void {
    this.afAuth.auth.signOut();
    this.authState = null;
    this.router.navigate(['login']);    
    
  }
}

