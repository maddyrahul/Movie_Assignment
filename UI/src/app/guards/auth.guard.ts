import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      // Check user role
      const userRole = this.authService.getRole();
      if (route.data && route.data['role'] && route.data['role'] === userRole) { 
        return true;
      } else {
        // Unauthorized - show alert and redirect to login or access denied page
        alert(`Access Denied! Only users with the role: ${route.data['role']} can access this page.`);
        this.router.navigate(['/user'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    } else {
      // Not logged in - show alert and redirect to login with return URL
     // alert('You must be logged in to access this page.');
      this.router.navigate(['/user'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
