import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [HomeRoutingModule, SharedModule,NgxDatatableModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
