import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendenceMgmtSystemSharedModule } from 'app/shared/shared.module';
import { AttendanceEntryComponent } from './attendance-entry.component';
import { AttendanceEntryDetailComponent } from './attendance-entry-detail.component';
import { AttendanceEntryUpdateComponent } from './attendance-entry-update.component';
import { AttendenceEntryDeletePopupComponent, AttendanceEntryDeleteDialogComponent } from './attendance-entry-delete-dialog.component';
import { attendanceEntryRoute, attendenceEntryPopupRoute } from './attendance-entry.route';

const ENTITY_STATES = [...attendanceEntryRoute, ...attendenceEntryPopupRoute];

@NgModule({
  imports: [AttendenceMgmtSystemSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AttendanceEntryComponent,
    AttendanceEntryDetailComponent,
    AttendanceEntryUpdateComponent,
    AttendanceEntryDeleteDialogComponent,
    AttendenceEntryDeletePopupComponent
  ],
  entryComponents: [AttendanceEntryDeleteDialogComponent]
})
export class AttendanceEntryModule {}
