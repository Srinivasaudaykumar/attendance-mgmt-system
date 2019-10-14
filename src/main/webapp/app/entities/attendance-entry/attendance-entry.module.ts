import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendanceMgmtSystemSharedModule } from 'app/shared/shared.module';
import { AttendanceEntryComponent } from './attendance-entry.component';
import { AttendanceEntryDetailComponent } from './attendance-entry-detail.component';
import { AttendanceEntryUpdateComponent } from './attendance-entry-update.component';
import { AttendanceEntryDeletePopupComponent, AttendanceEntryDeleteDialogComponent } from './attendance-entry-delete-dialog.component';
import { attendanceEntryRoute, attendanceEntryPopupRoute } from './attendance-entry.route';

const ENTITY_STATES = [...attendanceEntryRoute, ...attendanceEntryPopupRoute];

@NgModule({
  imports: [AttendanceMgmtSystemSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AttendanceEntryComponent,
    AttendanceEntryDetailComponent,
    AttendanceEntryUpdateComponent,
    AttendanceEntryDeleteDialogComponent,
    AttendanceEntryDeletePopupComponent
  ],
  entryComponents: [AttendanceEntryDeleteDialogComponent]
})
export class AttendanceEntryModule {}
