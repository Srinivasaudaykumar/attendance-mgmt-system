import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAttendanceEntry } from 'app/shared/model/attendance-entry.model';

type EntityResponseType = HttpResponse<IAttendanceEntry>;
type EntityArrayResponseType = HttpResponse<IAttendanceEntry[]>;

@Injectable({ providedIn: 'root' })
export class AttendanceEntryService {
  public resourceUrl = SERVER_API_URL + 'api/attendance-entries';

  constructor(protected http: HttpClient) {}

  create(attendanceEntry: IAttendanceEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(attendanceEntry);
    return this.http
      .post<IAttendanceEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(attendanceEntry: IAttendanceEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(attendanceEntry);
    return this.http
      .put<IAttendanceEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAttendanceEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAttendanceEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(attendanceEntry: IAttendanceEntry): IAttendanceEntry {
    const copy: IAttendanceEntry = Object.assign({}, attendanceEntry, {
      createdDate:
        attendanceEntry.createdDate != null && attendanceEntry.createdDate.isValid() ? attendanceEntry.createdDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((attendanceEntry: IAttendanceEntry) => {
        attendanceEntry.createdDate = attendanceEntry.createdDate != null ? moment(attendanceEntry.createdDate) : null;
      });
    }
    return res;
  }
}
