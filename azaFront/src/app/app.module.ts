import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { UserComponent } from './user/user.component';
import { CaseDetailsComponent } from './case/case-details/case-details.component';
import { CaseAddComponent } from './case/case-add/case-add.component';
import { CaseListComponent } from './case/case-list/case-list.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientDetailsComponent,
    ClientAddComponent,
    ClientsListComponent,
    UserComponent,
    CaseDetailsComponent,
    CaseAddComponent,
    CaseListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
