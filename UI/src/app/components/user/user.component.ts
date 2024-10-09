import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  loginForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private utilityService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.pwd;
  
    this.utilityService.Userlogin(email, password).subscribe(
      response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
          const decodedToken = this.utilityService.decodeToken(token);
          const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
          this.utilityService.setUserId(userId);
          this.utilityService.setRole(userRole);
          if(this.utilityService.isAdmin()){
            console.log("admin",this.utilityService.isAdmin())
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['/movie-list']);
          }
        }
      },
      error => {
        if (error.status === 401) {
          this.message = error.error === 'User is banned.' ? 'User is banned.' : 'Invalid email or password.';
        } else {
          this.message = 'An error occurred. Please try again later.';
        }
      }
    );
  }
  

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
