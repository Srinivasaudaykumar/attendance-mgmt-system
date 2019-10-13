import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Organization } from 'app/core/organization/organization.model';
import { OrganizationService } from '../../core/organization/organization.service';
import { OrganizationManagementComponent } from './organization-management.component';
import { OrganizationManagementDetailComponent } from './organization-management-detail.component';
import { OrganizationManagementUpdateComponent } from './organization-management-update.component';
import { OrganizationDeletePopupComponent } from './organization-management-delete-dialog.component';
import { IOrganization } from 'app/core/organization/organization.model';

@Injectable({ providedIn: 'root' })
export class OrganizationResolve implements Resolve<IOrganization> {
  constructor(private service: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrganization> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Organization>) => response.ok),
        map((organization: HttpResponse<Organization>) => organization.body)
      );
    }
    return of(new Organization());
  }
}

export const organizationManagementRoute: Routes = [
  {
    path: '',
    component: OrganizationManagementComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrganizationManagementDetailComponent,
    resolve: {
      organization: OrganizationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrganizationManagementUpdateComponent,
    resolve: {
      organization: OrganizationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrganizationManagementUpdateComponent,
    resolve: {
      organization: OrganizationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const organizationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrganizationDeletePopupComponent,
    resolve: {
      organization: OrganizationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
