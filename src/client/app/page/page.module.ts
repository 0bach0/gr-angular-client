import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';
import { RequestServerService } from '../shared/service/request.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Angular2SocialLoginModule } from "angular2-social-login";

@NgModule({
  imports: [CommonModule, PageRoutingModule,NgxDatatableModule, Angular2SocialLoginModule],
  declarations: [PageComponent],
  exports: [PageComponent],
  providers:[RequestServerService]
})
export class PageModule { }
