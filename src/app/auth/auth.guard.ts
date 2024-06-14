import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

    if (token && tokenExpiresAt) {
      const tokenExpirationDate = new Date(tokenExpiresAt);
      const now = new Date();

      if (now < tokenExpirationDate) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
