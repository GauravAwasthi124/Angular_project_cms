import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category/category.service';
import { CategoryformComponent } from 'src/app/shaired/categoryform/categoryform.component';
import { DeletedialogComponent } from 'src/app/shaired/deletedialog/deletedialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = [ 'positin','category_name', 'added_by', 'status', 'edit', 'delete'];
  token = localStorage.getItem('token');
  categorydata!:any;
  constructor(private dialog: MatDialog, private category: CategoryService) { }

  ngOnInit(): void {
    this.getdata();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryformComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getdata();
      }
    });
  } 
  getdata() {
    this.category.getCategory(this.token).subscribe({
      next: (res: any) => {
        this.categorydata= res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
 
  editCategory(index: number) {
    const editCategoryData = this.categorydata[index];
    const dialogRef = this.dialog.open(CategoryformComponent, {
      width: '450px',
      data: {
        id: editCategoryData.id,
        category_name: editCategoryData.category_name,
        status: editCategoryData.status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getdata();
      }
    });
  }

  deleteCategory(index: number) {
    const deletecategory = this.categorydata[index];
    const dialogRef = this.dialog.open(DeletedialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.category.deleteCategory(this.token, deletecategory.id).subscribe({
          next: () => {
            this.getdata();
          },
          error: (err) => {
            console.error('Error deleting category:', err);
          }
        });
      }
    });
  }
}
