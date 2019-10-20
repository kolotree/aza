import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('azaUser'));
    if (user == null) {
      this.router.navigate(['/login']);
      return false;
    } else if (user.role === 'admin' && state.url.includes('user')) {
      this.router.navigate(['/client']);
      return false;
    } else if (user.role === 'user' && !state.url.includes('user')) {
      this.router.navigate(['/user/' + user.id]);
      return false;
    }
    return true;
  }
}
