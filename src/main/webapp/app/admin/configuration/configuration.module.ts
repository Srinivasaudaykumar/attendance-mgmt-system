import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttendenceMgmtSystemSharedModule } from 'app/shared/shared.module';

import { JhiConfigurationComponent } from './configuration.component';

import { configurationRoute } from './configuration.route';

@NgModule({
  imports: [AttendenceMgmtSystemSharedModule, RouterModule.forChild([configurationRoute])],
  declarations: [JhiConfigurationComponent]
})
export class ConfigurationModule {}
