import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccessCard } from 'app/core/accesscard/access-card.model';

@Component({
  selector: 'jhi-access-card-detail',
  templateUrl: './access-card-detail.component.html'
})
export class AccessCardDetailComponent implements OnInit {
  accessCard: IAccessCard;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ accessCard }) => {
      this.accessCard = accessCard;
    });
  }

  previousState() {
    window.history.back();
  }
}
