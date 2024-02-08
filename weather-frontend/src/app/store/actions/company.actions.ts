import { createAction, props } from '@ngrx/store';
import { CompanyUser } from '../../company/company-user.model';

// Get Company Actions
export const getCompany = createAction('[Company] Get Company', props<{ companyId: string }>());

export const getCompanySuccess = createAction('[Company] Get Company Success', props<{ company: CompanyUser }>());

export const getCompanyFailure = createAction('[Company] Get Company Failure', props<{ error: string }>());

// Update Company Actions
export const updateCompany = createAction('[Profile] Update Company', props<{ company: CompanyUser }>());

export const updateCompanySuccess = createAction('[Profile] Update Company Success', props<{ company: CompanyUser }>());

export const updateCompanyFailure = createAction('[Profile] Update Company Failure', props<{ error: string }>());

// Delete Company Actions
export const deleteCompany = createAction('[Profile] Delete Company', props<{ companyId: string }>());

export const deleteCompanySuccess = createAction('[Profile] Delete Company Success');

export const deleteCompanyFailure = createAction('[Profile] Delete Company Failure', props<{ error: string }>());

// Misc Actions
export const clearCompanyError = createAction('[Company] Clear Error');

export const setCompanyId = createAction('[Company] Set Company Id', props<{ companyId: string }>());

