import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AccessCard } from 'app/core/accesscard/access-card.model';
import { AccessCardService } from '../../core/accesscard/access-card.service';
import { AccessCardComponent } from './access-card.component';
import { AccessCardDetailComponent } from './access-card-detail.component';
import { AccessCardUpdateComponent } from './access-card-update.component';
import { AccessCardDeletePopupComponent } from './access-card-delete-dialog.component';
import { IAccessCard } from 'app/core/accesscard/access-card.model';

@Injectable({ providedIn: 'root' })
export class AccessCardResolve implements Resolve<IAccessCard> {
  constructor(private service: AccessCardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAccessCard> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AccessCard>) => response.ok),
        map((accessCard: HttpResponse<AccessCard>) => accessCard.body)
      );
    }
    return of(new AccessCard());
  }
}

export const accessCardRoute: Routes = [
  {
    path: '',
    component: AccessCardComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AccessCards'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AccessCardDetailComponent,
    resolve: {
      accessCard: AccessCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AccessCards'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AccessCardUpdateComponent,
    resolve: {
      accessCard: AccessCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AccessCards'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AccessCardUpdateComponent,
    resolve: {
      accessCard: AccessCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AccessCards'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const accessCardPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AccessCardDeletePopupComponent,
    resolve: {
      accessCard: AccessCardResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AccessCards'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
