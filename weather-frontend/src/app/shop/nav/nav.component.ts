import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, selectUserType } from '../../store/selectors/user.selectors';
import * as UserAction from '../../store/actions/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  userType: string | undefined = '';
  userId: string | null = '';
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.userType = user?.type;
        this.userId = user?.id;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewProduct() {
    this.router.navigate(['productForm', 'false']);
  }

  openMyProducts() {
    this.router.navigate(['shop', 'listProducts', `${this.userId}`]);
  }

  openMyOrders() {
    // TO DO
    this.router.navigate(['shop', 'myOrders']);
  }

  openCart() {
    this.router.navigate(['shop', 'cart']);
  }

  openMainPage() {
    this.router.navigate(['shop', 'listProducts', 'undefined']);
  }

  openWeatherApp() {
    this.router.navigate(['']);
  }

  openProfile() {
    if (this.userType == undefined) {
      this.router.navigate(['signUpUser']);
    }
    else {
      this.router.navigate(['shop', 'profile']);
    }
  }

  signOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('rememberMe');
    this.store.dispatch(UserAction.signOut());
    this.router.navigate(['']);
  }
}
