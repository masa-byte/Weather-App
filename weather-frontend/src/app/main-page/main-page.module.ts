import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { CommentsModule } from '../comments/comments.module';
import { ForecastModule } from '../forecast/forecast.module';
import { MainPageComponent } from './main-page.component';
import { SearchCityBarComponent } from './search-city-bar/search-city-bar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    MainPageComponent,
    SearchCityBarComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ForecastModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    BackgroundPictureModule,
    CommentsModule,
  ]
})
export class MainPageModule { }
