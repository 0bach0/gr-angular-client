import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { TokenRoutingModule } from './token-routing.module';
import { RequestServerService } from '../shared/service/request.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Angular2SocialLoginModule } from "angular2-social-login";

@NgModule({
  imports: [CommonModule, TokenRoutingModule,NgxDatatableModule, Angular2SocialLoginModule],
  declarations: [TokenComponent],
  exports: [TokenComponent],
  providers:[RequestServerService]
})
export class TokenModule { }
