import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

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
import { from } from 'rxjs';
import { Errorpage404Component } from './errorpage404/errorpage404.component';


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
    LoginComponent,
    Errorpage404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCnS8HgceeX9tYre5KYDTzD3JxewlGFhAs',
      authDomain: 'apza-9710f.firebaseapp.com',
      projectId: 'apza-9710f',
      storageBucket: 'apza-9710f.appspot.com',
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
