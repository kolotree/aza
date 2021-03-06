import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { CaseListComponent } from './case/case-list/case-list.component';
import { CaseDetailsComponent } from './case/case-details/case-details.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';
import { CaseAddComponent } from './case/case-add/case-add.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GuardService } from './services/guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientsListComponent, canActivate: [GuardService] },
  { path: 'client/:id', component: ClientDetailsComponent, canActivate: [GuardService] },
  { path: 'case', component: CaseListComponent, canActivate: [GuardService] },
  { path: 'case/:id', component: CaseDetailsComponent, canActivate: [GuardService] },
  { path: 'addClient', component: ClientAddComponent, canActivate: [GuardService] },
  { path: 'addCase/:id', component: CaseAddComponent, canActivate: [GuardService] },
  { path: 'user/:id', component: UserComponent, canActivate: [GuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
