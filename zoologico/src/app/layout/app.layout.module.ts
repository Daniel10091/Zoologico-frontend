import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutRoutingModule } from './app.layout-routing.module';
import { AppLayoutComponent } from './app.layout.component';

import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AppTopbarComponent } from './components/topbar/app.topbar.component';
import { AppFooterComponent } from './components/footer/app.footer.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    AppTopbarComponent,
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    
		MenubarModule,
		MenuModule,
		ButtonModule,
		ToggleButtonModule,
    ContextMenuModule
  ],
  providers: [ ],
  bootstrap: [ AppLayoutComponent]
})
export class AppLayoutModule { }
