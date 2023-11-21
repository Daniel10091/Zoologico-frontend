import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutRoutingModule } from './app.layout-routing.module';
import { AppLayoutComponent } from './app.layout.component';

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
  ],
  providers: [ ],
  bootstrap: [ AppLayoutComponent]
})
export class AppLayoutModule { }
