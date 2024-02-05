import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './main-page/sign-in/sign-in.component';
import { SignUpComponent } from './main-page/sign-up/sign-up.component';
import { ShopComponent } from './shop/shop.component';
import { ProductFormComponent } from './product/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'signInUser',
    component: SignInComponent,
    pathMatch: 'full',
  },
  {
    path: 'signUpUser',
    component: SignUpComponent,
    pathMatch: 'full',
  },
  {
    path: 'productForm',
    component: ProductFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
