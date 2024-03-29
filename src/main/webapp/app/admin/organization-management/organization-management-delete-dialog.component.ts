import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganization } from 'app/core/organization/organization.model';
import { OrganizationService } from '../../core/organization/organization.service';

@Component({
  selector: 'jhi-organization-delete-dialog',
  templateUrl: './organization-management-delete-dialog.component.html'
})
export class OrganizationManagementDeleteDialogComponent {
  organization: IOrganization;

  constructor(
    protected organizationService: OrganizationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.organizationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'organizationListModification',
        content: 'Deleted an organization'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-organization-delete-popup',
  template: ''
})
export class OrganizationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organization }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrganizationManagementDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.organization = organization;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/organization', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/organization', { outlets: { popup: null } }]);
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
