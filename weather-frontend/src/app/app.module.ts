import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsModule } from './comments/comments.module';
import { MainPageModule } from './main-page/main-page.module';
import { weatherReducer } from './store/weather.reducer';
import { MainPageModule } from './main-page/main-page.module';
import { weatherReducer } from './store/reducers/weather.reducer';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducer';
import { ShopModule } from './shop/shop.module';
import { CompanyEffects } from './store/effects/company.effects';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';
import { ProductModule } from './product/product.module';
import { cartReducer } from './store/reducers/cart.reducer';

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
    StoreModule.forRoot({
      weather: weatherReducer,
      user: userReducer,
      products: productReducer,
      cart: cartReducer
    }, {}),
    EffectsModule.forRoot([
      UserEffects,
      CompanyEffects,
      ProductEffects
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
