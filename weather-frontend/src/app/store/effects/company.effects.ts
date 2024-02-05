import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CompanyActions from '../actions/company.actions';
import { CompanyService } from '../../company/company.service';
import { CompanyUser } from '../../company/company-user.model';
import { mapToCompanyUser } from '../../utility/utility';

@Injectable()
export class CompanyEffects {
    constructor(
        private actions$: Actions,
        private companyService: CompanyService,
    ) { }

    setCompanyId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.setCompanyId),
            switchMap(({ companyId }) =>
                this.companyService.getCompany(companyId).pipe(
                    map((response) => {
                        let body = response.body;
                        let company: CompanyUser = mapToCompanyUser(body);
                        return CompanyActions.getCompanySuccess({ company });
                    },
                        catchError((error) => {
                            return of(CompanyActions.getCompanyFailure({ error: 'Failed to get company' }));
                        })
                    )
                )
            )
        ));

    getCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.getCompany),
            switchMap(({ companyId }) =>
                this.companyService.getCompany(companyId).pipe(
                    map((response) => {
                        let body = response.body;
                        console.log(body);
                        let company: CompanyUser = mapToCompanyUser(body);
                        return CompanyActions.getCompanySuccess({ company });
                    },
                        catchError((error) => {
                            return of(CompanyActions.getCompanyFailure({ error: 'Failed to get company' }));
                        })
                    )
                )
            )
        ));

    updateCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.updateCompany),
            switchMap(({ company }) =>
                this.companyService.updateCompany(company).pipe(
                    map((response) => {
                        let body = response.body;
                        let company: CompanyUser = mapToCompanyUser(body);
                        return CompanyActions.updateCompanySuccess({ company: company });
                    }),
                    catchError((error) => {
                        return of(CompanyActions.updateCompanyFailure({ error: 'Failed to update company' }));
                    })
                )
            )
        ));

    deleteCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.deleteCompany),
            switchMap(({ companyId }) =>
                this.companyService.deleteCompany(companyId).pipe(
                    map(() => {
                        return CompanyActions.deleteCompanySuccess();
                    }),
                    catchError((error) => {
                        return of(CompanyActions.deleteCompanyFailure({ error: 'Failed to delete company' }));
                    })
                )
            )
        ));
}
