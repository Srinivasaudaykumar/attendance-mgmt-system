import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganization } from 'app/core/organization/organization.model';

@Component({
  selector: 'jhi-organization-detail',
  templateUrl: './organization-management-detail.component.html'
})
export class OrganizationManagementDetailComponent implements OnInit {
  organization: IOrganization;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organization }) => {
      this.organization = organization;
    });
  }

  previousState() {
    window.history.back();
  }
}
