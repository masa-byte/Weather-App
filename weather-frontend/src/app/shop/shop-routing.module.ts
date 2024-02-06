import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../user/profile/profile.component';
import { ShopComponent } from './shop.component';
import { ListProductsComponent } from './list-products/list-products.component';

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
        // TO DO
        path: 'myOrders',
        component: ProfileComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }