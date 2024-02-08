import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../user/profile/profile.component';
import { ShopComponent } from './shop.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { CartComponent } from './cart/cart.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'profile', 
        component: ProfileComponent
      },
      {
        path: 'listProducts/:companyId',
        component: ListProductsComponent
      },
      {
        path: 'myOrders',
        component: ListOrdersComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
