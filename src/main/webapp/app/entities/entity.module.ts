import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'attendance-entry',
        loadChildren: () => import('./attendance-entry/attendance-entry.module').then(m => m.AttendanceEntryModule)
      } /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AttendanceMgmtSystemEntityModule {}
