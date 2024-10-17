import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category/category.service';
import { LoginService } from 'src/app/service/login/login.service';
import { SubcategoryService } from 'src/app/service/subcategory/subcategory.service';

@Component({
  selector: 'app-subcategoryform',
  templateUrl: './subcategoryform.component.html',
  styleUrls: ['./subcategoryform.component.css']
})
export class SubcategoryformComponent implements OnInit{
  subcategoryform!: FormGroup;
  token = localStorage.getItem('token');
  category!: any;
  profiledata!: any;
  constructor(private cat: CategoryService,
    private fb: FormBuilder,
    private profile: LoginService,
    private subcateogory:SubcategoryService
  ) {
    this.subcategoryform = this.fb.group({
      category_id: ['', [Validators.required]],
      sub_category_name: ['', [Validators.required]],
      added_by: [{ disabled: true }],
      status:['0',[Validators.required]]
    })
   }
  ngOnInit(): void {
    this.getCategory()
    this.profileData()
  }
  getCategory() {
    this.cat.getCategory(this.token).subscribe({
      next: (res:any)=>{
        this.category = res;
      }
    })
  }
  profileData() {
    this.profile.profileUser(this.token).subscribe({
      next: (res: any) => {
        // console.log(res)
        this.profiledata = res;
        this.subcategoryform.get('added_by')?.setValue(this.profiledata.authData.users.name);
        }
      })
  }
  submit() {
    if (this.subcategoryform.valid) {
      const { category_id, sub_category_name, added_by, status } = this.subcategoryform.value;
      this.subcateogory.postSubCategory(this.token, category_id, sub_category_name, added_by, status).subscribe({
        next: (res: any) => {
          console.log(this.subcategoryform.getRawValue()); 
        }
      })
    } else {
      console.log('error')
    }
  }
}
