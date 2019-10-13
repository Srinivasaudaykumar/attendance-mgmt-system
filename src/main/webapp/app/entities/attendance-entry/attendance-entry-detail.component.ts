import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttendenceEntry } from 'app/shared/model/attendance-entry.model';

@Component({
  selector: 'jhi-attendence-entry-detail',
  templateUrl: './attendance-entry-detail.component.html'
})
export class AttendanceEntryDetailComponent implements OnInit {
  attendenceEntry: IAttendenceEntry;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attendenceEntry }) => {
      this.attendenceEntry = attendenceEntry;
    });
  }

  previousState() {
    window.history.back();
  }
}
