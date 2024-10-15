import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { MainComponent } from './main/main.component';
import { UserlistComponent } from './users/userlist/userlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component:UsersComponent
  },
  {
    path: 'main',
    component:MainComponent
  },
  {
    path: 'userlist',
    component: UserlistComponent  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
