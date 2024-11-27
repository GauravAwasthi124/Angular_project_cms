import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubcategoryService } from 'src/app/service/subcategory/subcategory.service';
import { DeletedialogComponent } from 'src/app/shaired/deletedialog/deletedialog.component';
import { SubcategoryformComponent } from 'src/app/shaired/subcategoryform/subcategoryform.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})

export class SubcategoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'category_name', 'subcategory_name', 'added_by', 'status', 'edit', 'delete'];
  token = localStorage.getItem('token');
  subcategorydata!:any;

  constructor(private dialog: MatDialog, private subcategory: SubcategoryService) { }

  ngOnInit(): void {
    this.subCategoryData();
  } 
 
  openDialog() {
    const dialogRef = this.dialog.open(SubcategoryformComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subCategoryData();
      }
    });
  }

  subCategoryData() {
    this.subcategory.getSubCategory(this.token).subscribe({
      next: (res: any) => {
        this.subcategorydata = res;
      },
      error: (err) => {
        console.error('Error fetching subcategory data:', err);
      }
    });
  }

  editSubCategory(index: number) {
    const editSubCategoryData = this.subcategorydata[index];
    const dialogRef = this.dialog.open(SubcategoryformComponent, {
      width: '450px',
      data: {
        id: editSubCategoryData.id,
        category_id: editSubCategoryData.category_id,
        sub_category_name: editSubCategoryData.sub_category_name,
        status: editSubCategoryData.status
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subCategoryData();
      }
    });
  }

  deleteSubCategory(index: number) {
    const deletesubcategory = this.subcategorydata[index];
    const dialogRef = this.dialog.open(DeletedialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.subcategory.deleteSubCategory(this.token, deletesubcategory.id).subscribe({
          next: () => {
            this.subCategoryData();
          },
          error: (err) => {
            console.error('Error deleting subcategory:', err);
          }
        });
      }
    });
  }
}
