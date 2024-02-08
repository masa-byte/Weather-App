import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductFormComponent } from './product-form/product-form.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductDisplayComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
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
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
    ProductDisplayComponent,
  ]
})
export class ProductModule { }
