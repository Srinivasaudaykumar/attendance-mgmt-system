import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccessCard } from 'app/core/accesscard/access-card.model';
import { AccessCardService } from '../../core/accesscard/access-card.service';

@Component({
  selector: 'jhi-access-card-delete-dialog',
  templateUrl: './access-card-delete-dialog.component.html'
})
export class AccessCardDeleteDialogComponent {
  accessCard: IAccessCard;

  constructor(
    protected accessCardService: AccessCardService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.accessCardService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'accessCardListModification',
        content: 'Deleted an accessCard'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-access-card-delete-popup',
  template: ''
})
export class AccessCardDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ accessCard }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AccessCardDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.accessCard = accessCard;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/access-card', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/access-card', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
