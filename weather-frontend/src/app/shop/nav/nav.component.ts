import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserType } from '../../store/selectors/user.selectors';
import * as UserAction from '../../store/actions/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  userType: string | undefined = '';
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(selectUserType).subscribe((userType) => {
      this.userType = userType;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewProduct() {
    // TO DO
    this.router.navigate(['productForm']);
  }

  openMyProducts() {
    // TO DO
    this.router.navigate(['shop', 'myProducts']);
  }

  openMyOrders() {
    // TO DO
    this.router.navigate(['shop', 'myOrders']);
  }

  openMainPage() {
    // TO DO
    this.router.navigate(['shop', 'listProducts']);
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
