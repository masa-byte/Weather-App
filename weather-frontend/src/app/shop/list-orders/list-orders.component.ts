import { Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, take, switchMap, map } from 'rxjs';
import { selectUser } from '../../store/selectors/user.selectors';
import { User } from '../../user/user.model';
import * as OrderActions from '../../store/actions/order.actions';
import { Order } from '../../order/order.model';
import { selectOrderEntities, selectOrderError, selectTotalNumberOfOrders } from '../../store/selectors/order.selector';
import { RatingDialogComponent } from '../../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss'
})
export class ListOrdersComponent {
  user$: Observable<User | null> = of();
  orders$: Observable<[string, Order | undefined][]> = of();

  userId: string = '0';

  length: number | undefined = undefined;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  pageEvent!: PageEvent;

  ratingErrorSubscription: Subscription = new Subscription();

  @HostBinding('style.overflow')
  overflow = 'auto';

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          this.userId = user.id;
          this.store.dispatch(OrderActions.loadTotalNumberOfOrders({ userId: this.userId }));
          this.store.dispatch(OrderActions.loadOrdersByPageIndexPageSize(
            {
              userId: this.userId,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
          ));
          return this.store.select(selectTotalNumberOfOrders);
        } else {
          return of(0);
        }
      })
    ).subscribe((totalNumberOfOrders) => {
      this.length = totalNumberOfOrders;
    });
    this.orders$ = this.store.select(selectOrderEntities).pipe(
      map((orderEntities) => Object.entries(orderEntities)),
    );
  }

  ngOnDestroy(): void {
    this.ratingErrorSubscription.unsubscribe();
  }

  rateOrder(event: string[]) {
    console.log(event);
    if (event[0] == "-1")
      this.openSnackBar('Order not finished yet!');
    else if (event[0] != "-1") {
      const dialogRef = this.dialog.open(RatingDialogComponent, {
        width: '400px',
        data: { numberOfProducts: event[1] }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const r = result['productRatings']
          const ratings: number[] = Object.values(r);
          this.store.dispatch(OrderActions.rateOrder({ orderId: event[0], ratings: ratings }));
          this.ratingErrorSubscription = this.store.select(selectOrderError).subscribe((rateError) => {
            if (rateError)
              this.openSnackBar(rateError);
            else {
              this.openSnackBar('Order items rated successfully!');
            }
          });
        }
      });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.store.dispatch(OrderActions.loadOrdersByPageIndexPageSize(
      {
        userId: this.userId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
    ));
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
