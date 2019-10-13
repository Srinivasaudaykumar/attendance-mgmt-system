import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAttendenceEntry } from 'app/shared/model/attendance-entry.model';

type EntityResponseType = HttpResponse<IAttendenceEntry>;
type EntityArrayResponseType = HttpResponse<IAttendenceEntry[]>;

@Injectable({ providedIn: 'root' })
export class AttendanceEntryService {
  public resourceUrl = SERVER_API_URL + 'api/attendence-entries';

  constructor(protected http: HttpClient) {}

  create(attendenceEntry: IAttendenceEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(attendenceEntry);
    return this.http
      .post<IAttendenceEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(attendenceEntry: IAttendenceEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(attendenceEntry);
    return this.http
      .put<IAttendenceEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAttendenceEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAttendenceEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(attendenceEntry: IAttendenceEntry): IAttendenceEntry {
    const copy: IAttendenceEntry = Object.assign({}, attendenceEntry, {
      createdDate:
        attendenceEntry.createdDate != null && attendenceEntry.createdDate.isValid() ? attendenceEntry.createdDate.toJSON() : null
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
      res.body.forEach((attendenceEntry: IAttendenceEntry) => {
        attendenceEntry.createdDate = attendenceEntry.createdDate != null ? moment(attendenceEntry.createdDate) : null;
      });
    }
    return res;
  }
}
