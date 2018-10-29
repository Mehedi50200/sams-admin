import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service'
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(public authService: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {}

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/dashboard'])
    }
  }

  onLoginEmail(): void { 
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/dashboard']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
      }
  }

 
  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!'
      this.toastr.warning(this.errorMessage, 'Email Error');
      return false
    } 
    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!'
      this.toastr.warning(this.errorMessage, 'Password empty Error');
      return false
    }
 
    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!'
      this.toastr.warning(this.errorMessage, 'Password Error');
      return false
    }
 
    this.errorMessage = '' 
    return true
  }
}
	

