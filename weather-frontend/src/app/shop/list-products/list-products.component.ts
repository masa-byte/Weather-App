import { Component, HostBinding } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, map, switchMap } from 'rxjs';
import { Product } from '../../product/models/product.model';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { selectFilteredProducts, selectTotalNumberOfProducts } from '../../store/selectors/product.selector';
import * as ProductActions from '../../store/actions/product.actions';
import * as CartActions from '../../store/actions/cart.actions';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  @HostBinding('style.overflow')
  overflow = 'auto';

  length: number | undefined = undefined;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  pageEvent!: PageEvent;

  products$: Observable<[string, Product | undefined][]> = of();
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(selectTotalNumberOfProducts).subscribe((totalNumberOfProducts) => {
      this.length = totalNumberOfProducts;
    });
    this.products$ = this.store.select(selectFilteredProducts).pipe(
      map((productEntities) => Object.entries(productEntities)),
    );

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let companyIdParam = params.get('companyId');
        if (!companyIdParam || companyIdParam === 'undefined') {
          companyIdParam = '';
        }

        const loadTotalNumberOfProductsAction = ProductActions.loadTotalNumberOfProducts({ companyId: companyIdParam });
        const loadProductsAction = ProductActions.loadProductsByPageIndexPageSize({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          companyId: companyIdParam
        });

        this.store.dispatch(loadTotalNumberOfProductsAction),
        this.store.dispatch(loadProductsAction)

        return of();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.store.dispatch(ProductActions.loadProductsByPageIndexPageSize(
      {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        companyId: ''
      }
    ));
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  addProductToCart(event: Product) {
    this.store.dispatch(CartActions.addProductToCart({ product: event }));
    this.openSnackBar('Product added to cart');
  }

  deleteProduct(event: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(ProductActions.deleteProduct({ id: event }));
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
