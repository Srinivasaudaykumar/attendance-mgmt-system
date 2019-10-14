import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AttendanceEntry } from 'app/shared/model/attendance-entry.model';
import { AttendanceEntryService } from './attendance-entry.service';
import { AttendanceEntryComponent } from './attendance-entry.component';
import { AttendanceEntryDetailComponent } from './attendance-entry-detail.component';
import { AttendanceEntryUpdateComponent } from './attendance-entry-update.component';
import { AttendanceEntryDeletePopupComponent } from './attendance-entry-delete-dialog.component';
import { IAttendanceEntry } from 'app/shared/model/attendance-entry.model';

@Injectable({ providedIn: 'root' })
export class AttendanceEntryResolve implements Resolve<IAttendanceEntry> {
  constructor(private service: AttendanceEntryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAttendanceEntry> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AttendanceEntry>) => response.ok),
        map((attendanceEntry: HttpResponse<AttendanceEntry>) => attendanceEntry.body)
      );
    }
    return of(new AttendanceEntry());
  }
}

export const attendanceEntryRoute: Routes = [
  {
    path: '',
    component: AttendanceEntryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendanceEntries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AttendanceEntryDetailComponent,
    resolve: {
      attendanceEntry: AttendanceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendanceEntries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AttendanceEntryUpdateComponent,
    resolve: {
      attendanceEntry: AttendanceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendanceEntries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AttendanceEntryUpdateComponent,
    resolve: {
      attendanceEntry: AttendanceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendanceEntries'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const attendanceEntryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AttendanceEntryDeletePopupComponent,
    resolve: {
      attendanceEntry: AttendanceEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttendanceEntries'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
