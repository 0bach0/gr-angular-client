import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';
import { RequestServerService } from '../shared/service/request.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

@NgModule({
  imports: [CommonModule, PageRoutingModule,NgxDatatableModule, Angular2SocialLoginModule,FormsModule,ReactiveFormsModule,NguiDatetimePickerModule],
  declarations: [PageComponent],
  exports: [PageComponent],
  providers:[RequestServerService]
})
export class PageModule { }
