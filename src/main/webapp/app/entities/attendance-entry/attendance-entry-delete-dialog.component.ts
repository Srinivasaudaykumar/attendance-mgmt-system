import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttendenceEntry } from 'app/shared/model/attendance-entry.model';
import { AttendanceEntryService } from './attendance-entry.service';

@Component({
  selector: 'jhi-attendence-entry-delete-dialog',
  templateUrl: './attendance-entry-delete-dialog.component.html'
})
export class AttendanceEntryDeleteDialogComponent {
  attendenceEntry: IAttendenceEntry;

  constructor(
    protected attendenceEntryService: AttendanceEntryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.attendenceEntryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'attendenceEntryListModification',
        content: 'Deleted an attendenceEntry'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-attendence-entry-delete-popup',
  template: ''
})
export class AttendenceEntryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attendenceEntry }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AttendanceEntryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.attendenceEntry = attendenceEntry;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/attendence-entry', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/attendence-entry', { outlets: { popup: null } }]);
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
