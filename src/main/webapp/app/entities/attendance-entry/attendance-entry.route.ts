import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AttendenceEntry } from 'app/shared/model/attendance-entry.model';
import { AttendanceEntryService } from './attendance-entry.service';
import { AttendanceEntryComponent } from './attendance-entry.component';
import { AttendanceEntryDetailComponent } from './attendance-entry-detail.component';
import { AttendanceEntryUpdateComponent } from './attendance-entry-update.component';
import { AttendenceEntryDeletePopupComponent } from './attendance-entry-delete-dialog.component';
import { IAttendenceEntry } from 'app/shared/model/attendance-entry.model';

@Injectable({ providedIn: 'root' })
export class AttendenceEntryResolve implements Resolve<IAttendenceEntry> {
  constructor(private service: AttendanceEntryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAttendenceEntry> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AttendenceEntry>) => response.ok),
        map((attendenceEntry: HttpResponse<AttendenceEntry>) => attendenceEntry.body)
      );
    }
    return of(new AttendenceEntry());
  }
}

export const attendanceEntryRoute: Routes = [
  {
    path: '',
    component: AttendanceEntryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendenceEntries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AttendanceEntryDetailComponent,
    resolve: {
      attendenceEntry: AttendenceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendenceEntries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AttendanceEntryUpdateComponent,
    resolve: {
      attendenceEntry: AttendenceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendenceEntries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AttendanceEntryUpdateComponent,
    resolve: {
      attendenceEntry: AttendenceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendenceEntries'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const attendenceEntryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AttendenceEntryDeletePopupComponent,
    resolve: {
      attendenceEntry: AttendenceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendenceEntries'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
