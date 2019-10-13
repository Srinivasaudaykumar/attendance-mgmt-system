import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IAccessCard } from 'app/core/accesscard/access-card.model';
import { AccountService } from 'app/core/auth/account.service';
import { AccessCardService } from '../../core/accesscard/access-card.service';

@Component({
  selector: 'jhi-access-card',
  templateUrl: './access-card.component.html'
})
export class AccessCardComponent implements OnInit, OnDestroy {
  accessCards: IAccessCard[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected accessCardService: AccessCardService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.accessCardService
      .query()
      .pipe(
        filter((res: HttpResponse<IAccessCard[]>) => res.ok),
        map((res: HttpResponse<IAccessCard[]>) => res.body)
      )
      .subscribe((res: IAccessCard[]) => {
        this.accessCards = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAccessCards();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAccessCard) {
    return item.id;
  }

  registerChangeInAccessCards() {
    this.eventSubscriber = this.eventManager.subscribe('accessCardListModification', response => this.loadAll());
  }
}
