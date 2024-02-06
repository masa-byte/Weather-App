import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';
import * as CompanyActions from './store/actions/company.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-frontend';

  constructor(
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedUserId = localStorage.getItem('userId');
      const savedUserType = localStorage.getItem('userType');
      const savedRememberMe = localStorage.getItem('rememberMe');
      if (savedRememberMe) {
        const rememberMe = savedRememberMe === 'true';
        if (rememberMe) {
          if (savedUserType == 'user')
            this.store.dispatch(UserActions.setUserId({ userId: savedUserId as string }));
          else if (savedUserType == 'company')
            this.store.dispatch(CompanyActions.setCompanyId({ companyId: savedUserId as string }));

          this.router.navigate(['shop', 'listProducts', 'undefined']);
        }
        else {
          localStorage.removeItem('userId');
          this.router.navigate(['']);
        }
      }
      else {
        this.router.navigate(['']);
      }
    }
  }
}
