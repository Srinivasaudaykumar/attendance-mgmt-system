import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrganization, Organization } from 'app/core/organization/organization.model';
import { OrganizationService } from '../../core/organization/organization.service';

@Component({
  selector: 'jhi-organization-update',
  templateUrl: './organization-management-update.component.html'
})
export class OrganizationManagementUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: []
  });

  constructor(protected organizationService: OrganizationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ organization }) => {
      this.updateForm(organization);
    });
  }

  updateForm(organization: IOrganization) {
    this.editForm.patchValue({
      id: organization.id,
      name: organization.name,
      address: organization.address
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const organization = this.createFromForm();
    if (organization.id !== undefined) {
      this.subscribeToSaveResponse(this.organizationService.update(organization));
    } else {
      this.subscribeToSaveResponse(this.organizationService.create(organization));
    }
  }

  private createFromForm(): IOrganization {
    return {
      ...new Organization(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      address: this.editForm.get(['address']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganization>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
