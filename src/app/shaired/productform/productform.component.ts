import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category/category.service';
import { LoginService } from 'src/app/service/login/login.service';
import { ProductService } from 'src/app/service/product/product.service';
import { SubcategoryService } from 'src/app/service/subcategory/subcategory.service';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {
  productform!: FormGroup
  token = localStorage.getItem('token');
  category!: any;
  subcategory!: any;
  profiledata!: any;
  selectedFile!: File;
  constructor(
    private cat: CategoryService,
    private sub: SubcategoryService,
    private product: ProductService,
    private fb: FormBuilder,
    private login: LoginService,
  ) {
    this.productform = this.fb.group({
      category_id: ['', [Validators.required]],
      sub_category_id: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      added_by: [{ disabled: true }],
      price: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      status: ['0', [Validators.required]]
    })
  }
  ngOnInit(): void {
    console.log('working');
    this.getCategory();
    this.getSubCategory();
    this.profileData();
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.productform.get('imageurl')?.setValue(file);
    }
  }


  getCategory() {
    this.cat.getCategory(this.token).subscribe({
      next: (res: any) => {
        this.category = res;
      }
    })
  }
  getSubCategory() {
    this.sub.getSubCategory(this.token).subscribe({
      next: (res: any) => {
        this.subcategory = res;
      }
    })
  }
  profileData() {
    this.login.profileUser(this.token).subscribe({
      next: (res: any) => {
        console.log(res);
        this.profiledata = res;
        this.productform.get('added_by')?.setValue(this.profiledata.authData.user.name);
      }
    })
  }
  submit() {
    if (this.productform.valid && this.selectedFile) {
      let formdata = new FormData;
      const { category_id, sub_category_id, product_name, description, added_by, price, imageurl, status } = this.productform.value;
      formdata.append('category_id', category_id);
      formdata.append('sub_category_id', sub_category_id);
      formdata.append('product_name', product_name);
      formdata.append('description', description);
      formdata.append('price', price);
      formdata.append('added_by', added_by);
      formdata.append('status', status);
      formdata.append('imageurl', imageurl);
      // return;
      this.product.postProduct(this.token, formdata).subscribe({
        next: (res: any) => {
          console.log(this.productform.getRawValue());
        }
      })
    } else {
      console.log('error');
    }
  }
}
