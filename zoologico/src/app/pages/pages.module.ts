import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { PagesRoutingModule } from './pages-routing.module';
import { AnimalsRoutingModule } from './animals/animals-routing.module';

import { AnimalsComponent } from './animals/animals.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { MammalsComponent } from './animals/categories/mammals/mammals.component';
import { BirdsComponent } from './animals/categories/birds/birds.component';
import { ReptilesComponent } from './animals/categories/reptiles/reptiles.component';
import { AmphibiansComponent } from './animals/categories/amphibians/amphibians.component';
import { FishComponent } from './animals/categories/fish/fish.component';
import { InsectsComponent } from './animals/categories/insects/insects.component';
import { ArachnidsComponent } from './animals/categories/arachnids/arachnids.component';
import { MolluscsComponent } from './animals/categories/molluscs/molluscs.component';
import { CrustaceansComponent } from './animals/categories/crustaceans/crustaceans.component';
import { EchinodermsComponent } from './animals/categories/echinoderms/echinoderms.component';
import { CoelenteratesComponent } from './animals/categories/coelenterates/coelenterates.component';
import { PoriferosComponent } from './animals/categories/poriferos/poriferos.component';
import { FlatwormsComponent } from './animals/categories/flatworms/flatworms.component';
import { RoundwormsComponent } from './animals/categories/roundworms/roundworms.component';
import { AnnelidsComponent } from './animals/categories/annelids/annelids.component';
import { ArthropodsComponent } from './animals/categories/arthropods/arthropods.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    AnimalsComponent,
    MammalsComponent,
    BirdsComponent,
    ReptilesComponent,
    AmphibiansComponent,
    FishComponent,
    InsectsComponent,
    ArachnidsComponent,
    MolluscsComponent,
    CrustaceansComponent,
    EchinodermsComponent,
    CoelenteratesComponent,
    PoriferosComponent,
    FlatwormsComponent,
    RoundwormsComponent,
    AnnelidsComponent,
    ArthropodsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    PagesRoutingModule,
    // AnimalsRoutingModule,
    
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
		MessagesModule,
		MessageModule,
		ToastModule,
  ]
})
export class PagesModule { }
