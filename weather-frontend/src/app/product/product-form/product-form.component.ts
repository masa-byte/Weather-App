import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, switchMap, take, EMPTY } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category';
import { User } from '../../user/user.model';
import { selectUser } from '../../store/selectors/user.selectors';
import { selectProductError, selectSelectedProduct } from '../../store/selectors/product.selector';
import * as ProductActions from '../../store/actions/product.actions';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    category: [],
    company: '',
    gradeCount: 0,
    gradeSum: 0
  }
  availableCategories = Object.values(Category);
  productCategoriesFormGroup: FormGroup;

  isEditing!: boolean;

  user: User | undefined = undefined;
  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.productCategoriesFormGroup = this.fb.group({
      categories: this.fb.array([]),
    });
    this.addCategory();
  }

  ngOnInit(): void {
    this.error$ = this.store.select(selectProductError);

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const editingParam = params.get('editing');
          this.isEditing = editingParam === 'true';

          if (this.isEditing) {
            return this.store.select(selectSelectedProduct).pipe(
              take(1)
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((product) => {
        if (product) {
          this.product = { ...product };
          this.setCategories();
        }
      });

    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  action() {
    this.product.category = [];
    this.getCategories();
    this.product.company = this.user!.id;

    this.store.dispatch(ProductActions.clearProductError());
    if (this.isEditing)
      this.store.dispatch(ProductActions.updateProduct({ product: this.product }));
    else
      this.store.dispatch(ProductActions.addProduct({ product: this.product }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        if (this.isEditing)
          this.openSnackBar("Product successfully updated!");
        else
          this.openSnackBar("Product successfully added!");
      }
    });
  }

  getCategories() {
    for (let i = 0; i < this.categories.length; i++) {
      const category = this.categories.at(i).get('name')!.value;
      this.product.category.push(category);
    }
  }

  get categories(): FormArray {
    return this.productCategoriesFormGroup.get('categories') as FormArray;
  }

  setCategories() {
    this.categories.removeAt(0);
    this.product.category.forEach((category) => {
      this.categories.push(this.fb.group({
        name: [category, Validators.required]
      }));
    });
  }

  addCategory() {
    this.categories.push(this.fb.group({
      name: ['', Validators.required]
    }));
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

  back() {
    window.history.back();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
