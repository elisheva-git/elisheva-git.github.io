import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PageNotFoundComponent,ErrorMessageComponent],
  imports: [
    CommonModule,MaterialModule,RouterModule
  ],
  exports:[RouterModule]
})
export class OtherModule { }
