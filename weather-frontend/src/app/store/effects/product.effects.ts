import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ProductService } from '../../product/product.service';
import * as ProductActions from '../actions/product.actions';
import { Product } from '../../product/models/product.model';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    loadTotalNumberOfProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadTotalNumberOfProducts),
            switchMap(({ companyId }) =>
                this.productService.getTotalNumberOfProducts(companyId).pipe(
                    map((response) => {
                        let body = response.body;
                        let totalNumberOfProducts: number = body;

                        return ProductActions.loadTotalNumberOfProductsSuccess({ total: totalNumberOfProducts });
                    }),
                    catchError((error) => {
                        return of(ProductActions.loadTotalNumberOfProductsFailure({ error: 'Failed to load total number of products' }));
                    })
                )
            )
        )
    );

    loadProductsByPageIndexPageSize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProductsByPageIndexPageSize),
            switchMap(({ pageIndex, pageSize, companyId }) =>
                this.productService.getProductsByPageIndexPageSize(pageIndex, pageSize, companyId).pipe(
                    map((response) => {
                        let body = response.body;
                        let allProducts: Product[] = body.map((product: any) => {
                            product.rating = product.gradeCount > 0 ? product.gradeSum / product.gradeCount : 0;
                            product.id = product._id;
                            const { _id, ...productWithout_Id } = product;
                            return productWithout_Id as Product;
                        });
                        console.log(allProducts);

                        return ProductActions.loadProductsSuccess({ product: allProducts });
                    }),
                    catchError((error) => {
                        return of(ProductActions.loadProductsFailure({ error: 'Failed to load products' }));
                    })
                )
            )
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            switchMap(({ product }) =>
                this.productService.addProduct(product).pipe(
                    map((response) => {
                        let body = response.body;
                        let product: Product = body as Product;

                        return ProductActions.addProductSuccess({ product: product });
                    }),
                    catchError((error) => {
                        return of(ProductActions.addProductFailure({ error: 'Failed to add product' }));
                    })
                )
            )
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            switchMap(({ id }) =>
                this.productService.deleteProduct(id).pipe(
                    map((response) => {
                        return ProductActions.deleteProductSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(ProductActions.deleteProductFailure({ error: 'Failed to delete product' }));
                    })
                )
            )
        )
    );
}