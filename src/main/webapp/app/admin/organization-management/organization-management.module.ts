import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendenceMgmtSystemSharedModule } from 'app/shared/shared.module';
import { OrganizationManagementComponent } from './organization-management.component';
import { OrganizationManagementDetailComponent } from './organization-management-detail.component';
import { OrganizationManagementUpdateComponent } from './organization-management-update.component';
import {
  OrganizationDeletePopupComponent,
  OrganizationManagementDeleteDialogComponent
} from './organization-management-delete-dialog.component';
import { organizationManagementRoute, organizationPopupRoute } from './organization-management.route';

const ENTITY_STATES = [...organizationManagementRoute, ...organizationPopupRoute];

@NgModule({
  imports: [AttendenceMgmtSystemSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrganizationManagementComponent,
    OrganizationManagementDetailComponent,
    OrganizationManagementUpdateComponent,
    OrganizationManagementDeleteDialogComponent,
    OrganizationDeletePopupComponent
  ],
  entryComponents: [OrganizationManagementDeleteDialogComponent]
})
export class OrganizationManagementModule {}
