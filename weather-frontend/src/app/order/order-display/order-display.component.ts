import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Order } from '../order.model';
import { selectUser } from '../../store/selectors/user.selectors';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrl: './order-display.component.scss'
})
export class OrderDisplayComponent {

  @Input() order!: Order | undefined;
  @Output() orderRateRequest = new EventEmitter<string[]>();

  constructor() { }

  rateOrder() {
    let a = new Date(this.order!.orderDate);
    let b = new Date(a);
    b.setDate(a.getDate() + 7);
    let currDate = new Date();

    if (currDate < b)
      this.orderRateRequest.emit(["-1", this.order!.products.length.toString()]);
    else
      this.orderRateRequest.emit([this.order!.id, this.order!.products.length.toString()]);
  }
}
