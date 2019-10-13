import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAccessCard, AccessCard } from 'app/core/accesscard/access-card.model';
import { AccessCardService } from '../../core/accesscard/access-card.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-access-card-update',
  templateUrl: './access-card-update.component.html'
})
export class AccessCardUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    cardNumber: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected accessCardService: AccessCardService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ accessCard }) => {
      this.updateForm(accessCard);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(accessCard: IAccessCard) {
    this.editForm.patchValue({
      id: accessCard.id,
      cardNumber: accessCard.cardNumber
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const accessCard = this.createFromForm();
    if (accessCard.id !== undefined) {
      this.subscribeToSaveResponse(this.accessCardService.update(accessCard));
    } else {
      this.subscribeToSaveResponse(this.accessCardService.create(accessCard));
    }
  }

  private createFromForm(): IAccessCard {
    return {
      ...new AccessCard(),
      id: this.editForm.get(['id']).value,
      cardNumber: this.editForm.get(['cardNumber']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccessCard>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
