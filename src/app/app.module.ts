import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainComponent } from './main/main.component';
import { UserlistComponent } from './pages/users/userlist.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CategoryComponent } from './pages/category/category.component';
import { DeletedialogComponent } from './shaired/deletedialog/deletedialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryformComponent } from './shaired/categoryform/categoryform.component';
import { SubcategoryformComponent } from './shaired/subcategoryform/subcategoryform.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductComponent } from './pages/product/product.component';
import { ProductformComponent } from './shaired/productform/productform.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    UserlistComponent,
    CategoryComponent,
    DeletedialogComponent,
    CategoryformComponent,
    SubcategoryformComponent,
    SubcategoryComponent,
    ProductComponent,
    ProductformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    MatToolbarModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
