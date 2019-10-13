import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAttendenceEntry, AttendenceEntry } from 'app/shared/model/attendance-entry.model';
import { AttendanceEntryService } from './attendance-entry.service';
import { IAccessCard } from 'app/core/accesscard/access-card.model';
import { AccessCardService } from 'app/core/accesscard/access-card.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-attendence-entry-update',
  templateUrl: './attendance-entry-update.component.html'
})
export class AttendanceEntryUpdateComponent implements OnInit {
  isSaving: boolean;

  accesscards: IAccessCard[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    machineId: [],
    accessCard: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected attendenceEntryService: AttendanceEntryService,
    protected accessCardService: AccessCardService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ attendenceEntry }) => {
      this.updateForm(attendenceEntry);
    });
    this.accessCardService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAccessCard[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAccessCard[]>) => response.body)
      )
      .subscribe((res: IAccessCard[]) => (this.accesscards = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(attendenceEntry: IAttendenceEntry) {
    this.editForm.patchValue({
      id: attendenceEntry.id,
      createdDate: attendenceEntry.createdDate != null ? attendenceEntry.createdDate.format(DATE_TIME_FORMAT) : null,
      machineId: attendenceEntry.machineId,
      accessCard: attendenceEntry.accessCard,
      user: attendenceEntry.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const attendenceEntry = this.createFromForm();
    if (attendenceEntry.id !== undefined) {
      this.subscribeToSaveResponse(this.attendenceEntryService.update(attendenceEntry));
    } else {
      this.subscribeToSaveResponse(this.attendenceEntryService.create(attendenceEntry));
    }
  }

  private createFromForm(): IAttendenceEntry {
    return {
      ...new AttendenceEntry(),
      id: this.editForm.get(['id']).value,
      createdDate:
        this.editForm.get(['createdDate']).value != null ? moment(this.editForm.get(['createdDate']).value, DATE_TIME_FORMAT) : undefined,
      machineId: this.editForm.get(['machineId']).value,
      accessCard: this.editForm.get(['accessCard']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttendenceEntry>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackAccessCardById(index: number, item: IAccessCard) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IUser) {
    return item.id;
  }
}
