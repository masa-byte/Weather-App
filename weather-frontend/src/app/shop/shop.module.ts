import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ShopComponent } from './shop.component';
import { NavComponent } from './nav/nav.component';
import { ShopRoutingModule } from './shop-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { EditProfileModule } from '../user/edit-profile/edit-profile.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { DeleteDialogModule } from '../delete-dialog/delete-profile.module';


@NgModule({
  declarations: [
    ProductFormComponent,
    ShopComponent,
    NavComponent,
    ListProductsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    DeleteDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    BackgroundPictureModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    EditProfileModule,
    MatPaginatorModule,
  ]
})
export class ShopModule { }
