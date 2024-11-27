import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './main/main.component';
import { UserlistComponent } from './pages/users/userlist.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'userlist',
    component: UserlistComponent
  },
  {
    path: 'category',
    component:CategoryComponent
  },
  {
    path: 'subcategory',
    component:SubcategoryComponent
  },
  {
    path: 'product',
    component:ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
