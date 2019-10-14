import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AttendanceMgmtSystemSharedModule } from 'app/shared/shared.module';
import { AttendanceMgmtSystemCoreModule } from 'app/core/core.module';
import { AttendanceMgmtSystemAppRoutingModule } from './app-routing.module';
import { AttendanceMgmtSystemHomeModule } from './home/home.module';
import { AttendanceMgmtSystemEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AttendanceMgmtSystemSharedModule,
    AttendanceMgmtSystemCoreModule,
    AttendanceMgmtSystemHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AttendanceMgmtSystemEntityModule,
    AttendanceMgmtSystemAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class AttendanceMgmtSystemAppModule {}
