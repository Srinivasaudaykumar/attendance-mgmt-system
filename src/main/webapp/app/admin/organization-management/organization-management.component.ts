import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganization } from 'app/core/organization/organization.model';
import { AccountService } from 'app/core/auth/account.service';
import { OrganizationService } from '../../core/organization/organization.service';

@Component({
  selector: 'jhi-organization',
  templateUrl: './organization-management.component.html'
})
export class OrganizationManagementComponent implements OnInit, OnDestroy {
  organizations: IOrganization[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected organizationService: OrganizationService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.organizationService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrganization[]>) => res.ok),
        map((res: HttpResponse<IOrganization[]>) => res.body)
      )
      .subscribe((res: IOrganization[]) => {
        this.organizations = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrganizations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrganization) {
    return item.id;
  }

  registerChangeInOrganizations() {
    this.eventSubscriber = this.eventManager.subscribe('organizationListModification', response => this.loadAll());
  }
}
