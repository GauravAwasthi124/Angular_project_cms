import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product/product.service';
import { ProductformComponent } from 'src/app/shaired/productform/productform.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit{
  displayedColumns: string[] = ['position', 'category_name', 'sub_category_name', 'product_name','description','price','image' ,'added_by', 'status', 'edit', 'delete'];
  token = localStorage.getItem('token');
  productData!: any;
  imageUrl = 'http://localhost:1111/upload/';

  constructor(private pro: ProductService, private dialog: MatDialog){}
  ngOnInit(): void {
    this.getProduct();
  } 
  openDialog() {
    const dialogRef = this.dialog.open(ProductformComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getProduct();
      }
    });
  }
  getProduct() {
    this.pro.getProduct(this.token).subscribe({
      next: (res: any) => {
        this.productData = res;
      }
    })
  }

}
