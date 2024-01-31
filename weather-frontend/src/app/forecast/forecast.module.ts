import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { DayComponent } from './day/day.component';
import { MatButtonModule } from '@angular/material/button';
import { HourComponent } from './hour/hour.component';

@NgModule({
  declarations: [DisplayComponent, DayComponent, HourComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [DisplayComponent]
})
export class ForecastModule { }
