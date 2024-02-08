import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product/models/product.model';
import { selectCartProducts, selectCartQuantities } from '../../store/selectors/cart.selector';
import * as CartActions from '../../store/actions/cart.actions';
import { Order } from '../../order/order.model';
import { selectUserId } from '../../store/selectors/user.selectors';
import * as OrderActions from '../../store/actions/order.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  quantities: number[] = [];
  userId: string | null = '';

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectCartProducts).subscribe((products) => {
      if (products)
        this.products = products;
    });
    this.store.select(selectCartQuantities).subscribe((quantities) => {
      if (quantities)
        this.quantities = quantities;
    });
    this.store.select(selectUserId).subscribe((userId) => {
      if (userId) {
        this.userId = userId;
      }
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for (let i = 0; i < this.products.length; i++) {
      total += this.products[i].price * this.quantities[i];
    }
    return total;
  }

  updateQuantity(index: number, quantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({ productId: this.products[index].id, quantity: quantity }));
  }

  removeFromCart(index: number): void {
    this.store.dispatch(CartActions.removeProductFromCart({ productId: this.products[index].id }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  placeOrder(): void {
    let order: Order = {
      id: '',
      products: this.products.map(p => p.id),
      quantities: this.quantities,
      totalPrice: this.getTotalPrice(),
      user: this.userId,
      orderDate: new Date(),
      reviewed: false
    };
    this.store.dispatch(OrderActions.addOrder({ order: order }));
    this.clearCart();
  }
}
