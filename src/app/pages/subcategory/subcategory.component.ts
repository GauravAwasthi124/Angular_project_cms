import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubcategoryService } from 'src/app/service/subcategory/subcategory.service';
import { CategoryformComponent } from 'src/app/shaired/categoryform/categoryform.component';
import { SubcategoryformComponent } from 'src/app/shaired/subcategoryform/subcategoryform.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit{
  displayedColumns: string[] = ['position', 'category_name','subcategory_name' ,'added_by', 'status', 'edit', 'delete'];
  subcategorydata!: any;
  token = localStorage.getItem('token');
  constructor(private dialog: MatDialog, private subcategory:SubcategoryService) { }
  ngOnInit(): void {
    this.subCategoryData();
  }
  openDialog() {
    const dialogRef = this.dialog.open(SubcategoryformComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.subCategoryData();
    }); 
  }
  subCategoryData() {
    this.subcategory.getSubCategory(this.token).subscribe({
      next: (res: any) => {
        console.log(res);
        this.subcategorydata = res;
      }
    })
  }
  editSubCategory(index: number) {
    
  }
  deleteSubCategory(index: number) {
    
  }
}
