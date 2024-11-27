import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category/category.service';
import { LoginService } from 'src/app/service/login/login.service';


@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.css']
})  
export class CategoryformComponent implements OnInit {
  profiledata!: any;
  categoryform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryformComponent>,
    private data: LoginService,
    private category: CategoryService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.categoryform = this.fb.group({
      category_name: ['', [Validators.required]],
      added_by: [{ disabled: true }],
      status: ['0',[Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.profileData();
    if (this.editData) {
      this.categoryform.patchValue({
        category_name: this.editData.category_name,
        status: this.editData.status
      });
    }
  }

  token = localStorage.getItem('token');

  profileData() {
    this.data.profileUser(this.token).subscribe(res => {
      this.profiledata = res;
      this.categoryform.get('added_by')?.setValue(this.profiledata.authData.user.name);
    });
  }

  submit() {
    if (this.categoryform.valid) {
      const { category_name, status } = this.categoryform.value;
      const added_by = this.profiledata.authData.user.name; 

      if (this.editData) {
        this.category.updateCategory(this.token, this.editData.id, category_name, added_by,status).subscribe({
          next: (res: any) => {
            this.dialogRef.close(true);
          }
        });
      } else {
        this.category.postCategory(this.token, category_name, added_by, status).subscribe({
          next: (res: any) => {
            this.dialogRef.close(true);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
