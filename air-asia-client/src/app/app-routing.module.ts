import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import  { LoginComponent }  from './login/login.component';
import  { CardListComponent }  from './card-list/card-list.component';
import  { CardDetailsComponent }  from './card-details/card-details.component';
import  { CardAddComponent }  from './card-add/card-add.component';
import  { CardUpdateComponent }  from './card-update/card-update.component';
import  { CardDeleteComponent }  from './card-delete/card-delete.component';
import  { CustAddComponent }  from './cust-add/cust-add.component';
import  { AuthGuard } from './guards/auth.guard';
import  { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'card-list', component: CardListComponent, canActivate: [AuthGuard] },
  { path: 'card-details', component: CardDetailsComponent, data : {some_data : 'some value'}, canActivate: [AuthGuard] },
  { path: 'card-add', component: CardAddComponent, canActivate: [AuthGuard] },
  { path: 'card-update', component: CardUpdateComponent, canActivate: [AuthGuard] },
  { path: 'card-delete', component: CardDeleteComponent, canActivate: [AuthGuard] },
  { path: 'cust-add', component: CustAddComponent, canActivate: [AuthGuard, AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
