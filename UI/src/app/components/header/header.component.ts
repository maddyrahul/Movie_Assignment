import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public userService: AuthService, public router: Router) { }
 
 
  logoutUser() {
    console.log('Logout button clicked');
    this.userService.logout();
    this.router.navigate(['/user']);
  }
}
