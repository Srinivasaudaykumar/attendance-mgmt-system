import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttendanceEntry } from 'app/shared/model/attendance-entry.model';
import { AttendanceEntryService } from './attendance-entry.service';

@Component({
  selector: 'jhi-attendance-entry-delete-dialog',
  templateUrl: './attendance-entry-delete-dialog.component.html'
})
export class AttendanceEntryDeleteDialogComponent {
  attendanceEntry: IAttendanceEntry;

  constructor(
    protected attendanceEntryService: AttendanceEntryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.attendanceEntryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'attendanceEntryListModification',
        content: 'Deleted an attendanceEntry'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-attendance-entry-delete-popup',
  template: ''
})
export class AttendanceEntryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attendanceEntry }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AttendanceEntryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.attendanceEntry = attendanceEntry;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/attendance-entry', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/attendance-entry', { outlets: { popup: null } }]);
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
