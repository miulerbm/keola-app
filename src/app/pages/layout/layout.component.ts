import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CurrentRouteService } from '../../service/current-route.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  currentRoute: string = '';
  private routeSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private currentRouteService: CurrentRouteService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.currentRouteService.currentRoute$.subscribe(
      (route) => {
        this.currentRoute = route;
        console.log('currentRoute updated', this.currentRoute);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription!.unsubscribe();
  }

  goBackToList() {
    this.router.navigate(['/memberships']);
  }

  logout() {
    this.authService.logout();
  }
}
