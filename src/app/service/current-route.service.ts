import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentRouteService {
  private currentRouteSubject: BehaviorSubject<string>;
  public currentRoute$: Observable<string>;

  constructor(private router: Router) {
    this.currentRouteSubject = new BehaviorSubject<string>('');
    this.currentRoute$ = this.currentRouteSubject.asObservable();

    this.init();
  }

  private init() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe((url: string) => {
        this.currentRouteSubject.next(url);
      });
  }

  getCurrentRoute(): string {
    return this.currentRouteSubject.getValue();
  }
}
