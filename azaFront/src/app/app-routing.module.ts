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


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'client', component: ClientsListComponent },
  { path: 'client/:id', component: ClientDetailsComponent},
  { path: 'case', component: CaseListComponent },
  { path: 'case/:id', component: CaseDetailsComponent },
  { path: 'addClient', component: ClientAddComponent },
  { path: 'addCase', component: CaseAddComponent},
  { path: 'user', component: UserComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
