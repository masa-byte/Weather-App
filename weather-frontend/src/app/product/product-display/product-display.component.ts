import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUser } from '../../store/selectors/user.selectors';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import * as ProductActions from '../../store/actions/product.actions';
import { CompanyUser } from '../../company/company-user.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {

  user$: Observable<User | null> = of();
  user: User | null = null;
  @Input() product!: Product | undefined;
  @Output() productDeleteRequest = new EventEmitter<string>();
  @Output() productInCartRequest = new EventEmitter<Product>();

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  addProductToCard() {
    this.productInCartRequest.emit(this.product!);
  }

  editProduct() {
    this.store.dispatch(ProductActions.selectProduct({ id: this.product!.id }));
    this.router.navigate(['productForm', 'true']);
  }

  deleteProduct() {
    this.productDeleteRequest.emit(this.product!.id);
  }
}
