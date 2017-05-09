import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenComponent } from './token.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'token', component: TokenComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TokenRoutingModule { }
