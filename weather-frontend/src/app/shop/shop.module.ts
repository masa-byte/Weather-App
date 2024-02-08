import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { NavComponent } from './nav/nav.component';
import { ShopRoutingModule } from './shop-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { DeleteDialogModule } from '../delete-dialog/delete-profile.module';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductModule } from '../product/product.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { CartComponent } from './cart/cart.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderModule } from '../order/order.module';
import { RatingDialogModule } from '../rating-dialog/rating-dialog.module';


@NgModule({
  declarations: [
    ShopComponent,
    NavComponent,
    ListProductsComponent,
    ProfileComponent,
    CartComponent,
    ListOrdersComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    DeleteDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    BackgroundPictureModule,
    MatPaginatorModule,
    ProductModule,
    SearchBarModule,
    OrderModule,
    RatingDialogModule
  ]
})
export class ShopModule { }
