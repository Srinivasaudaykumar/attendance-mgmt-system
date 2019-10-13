import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AttendenceMgmtSystemSharedModule } from 'app/shared/shared.module';
import { AttendenceMgmtSystemCoreModule } from 'app/core/core.module';
import { AttendenceMgmtSystemAppRoutingModule } from './app-routing.module';
import { AttendenceMgmtSystemHomeModule } from './home/home.module';
import { AttendenceMgmtSystemEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AttendenceMgmtSystemSharedModule,
    AttendenceMgmtSystemCoreModule,
    AttendenceMgmtSystemHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AttendenceMgmtSystemEntityModule,
    AttendenceMgmtSystemAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class AttendenceMgmtSystemAppModule {}
