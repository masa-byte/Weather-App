import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { DayComponent } from './day/day.component';
import { MatButtonModule } from '@angular/material/button';
import { HourComponent } from './hour/hour.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DisplayComponent, DayComponent, HourComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    NgChartsModule,
  ],
  exports: [DisplayComponent],
  providers: [DatePipe]
})
export class ForecastModule { }
