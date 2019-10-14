import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttendanceEntry } from 'app/shared/model/attendance-entry.model';

@Component({
  selector: 'jhi-attendance-entry-detail',
  templateUrl: './attendance-entry-detail.component.html'
})
export class AttendanceEntryDetailComponent implements OnInit {
  attendanceEntry: IAttendanceEntry;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attendanceEntry }) => {
      this.attendanceEntry = attendanceEntry;
    });
  }

  previousState() {
    window.history.back();
  }
}
