import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsModule } from './comments/comments.module';
import { MainPageModule } from './main-page/main-page.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { CompanyEffects } from './store/effects/company.effects';
import { ProductEffects } from './store/effects/product.effects';
import { UserEffects } from './store/effects/user.effects';
import { cartReducer } from './store/reducers/cart.reducer';
import { productReducer } from './store/reducers/product.reducer';
import { userReducer } from './store/reducers/user.reducer';
import { weatherReducer } from './store/reducers/weather.reducer';
import { orderReducer } from './store/reducers/order.reducer';
import { OrderEffects } from './store/effects/order.effects';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MainPageModule,
    ShopModule,
    ProductModule,
    OrderModule,
    StoreModule.forRoot({
      weather: weatherReducer,
      user: userReducer,
      products: productReducer,
      cart: cartReducer,
      orders: orderReducer,
    }, {}),
    EffectsModule.forRoot([
      UserEffects,
      CompanyEffects,
      ProductEffects,
      OrderEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    CommentsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
