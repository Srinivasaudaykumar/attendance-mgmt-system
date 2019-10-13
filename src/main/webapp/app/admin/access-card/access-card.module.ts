import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendenceMgmtSystemSharedModule } from 'app/shared/shared.module';
import { AccessCardComponent } from './access-card.component';
import { AccessCardDetailComponent } from './access-card-detail.component';
import { AccessCardUpdateComponent } from './access-card-update.component';
import { AccessCardDeletePopupComponent, AccessCardDeleteDialogComponent } from './access-card-delete-dialog.component';
import { accessCardRoute, accessCardPopupRoute } from './access-card.route';

const ENTITY_STATES = [...accessCardRoute, ...accessCardPopupRoute];

@NgModule({
  imports: [AttendenceMgmtSystemSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AccessCardComponent,
    AccessCardDetailComponent,
    AccessCardUpdateComponent,
    AccessCardDeleteDialogComponent,
    AccessCardDeletePopupComponent
  ],
  entryComponents: [AccessCardDeleteDialogComponent]
})
export class AccessCardModule {}
