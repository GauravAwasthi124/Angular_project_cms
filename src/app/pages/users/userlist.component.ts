import { Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { DeletedialogComponent } from 'src/app/shaired/deletedialog/deletedialog.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  toggleform: boolean = false;
  displayedColumns: string[] = ['position', 'name', 'email', 'userrole','status','edit','delete'];
  token = localStorage.getItem('token');
  userData: any;
  currentUserId: number | null = null;

  userform!: FormGroup;
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private user: UserService, private router: Router, private fb: FormBuilder, private dialog: MatDialog) { 
    this.userform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: this.email,
      userrole: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(6)]],
      status: ['', [Validators.required]]
    })
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  
  errorMessage = signal('');
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  ngOnInit(): void {
    this.data();
  }

  data() {
    this.user.getUsers(this.token).subscribe({
      next: (res: any) => {
        this.userData = res;
      }
    })
  }

  submit(event: Event) {
    if (this.userform.valid) {
      const { name, email, password, userrole, status } = this.userform.value;
      if (this.currentUserId) {
        this.user.updateUsers(this.token, this.currentUserId, name, email, userrole, password, status).subscribe({
          next: (res: any) => {
            console.log('User updated successfully:', res);
            this.data();
            this.reset();
            this.toggleform = false;
            this.currentUserId = null;
          },
          error: (err) => {
            console.error('Error updating user:', err);
          }
        });
      } else {
        this.user.postUsers(this.token, name, email, userrole, password, status).subscribe({
          next: (res: any) => {
            console.log('User added successfully:', res);
            this.data();
            this.reset();
            this.toggleform = false;
          },
          error: (err) => {
            console.error('Error adding user:', err);
          }
        });
      }
    } 
  }



  editUser(index: number) {
    const edituser = this.userData[index];
    this.toggleform = true;
    this.currentUserId = edituser.id;
    this.userform.patchValue({
      name: edituser.name,
      email: edituser.email,
      userrole: edituser.userrole,
      password: edituser.password,
      status: edituser.status
    });
  }


  deleteUser(index:number) {
    const deleteuser = this.userData[index];
    console.log(deleteuser.id);
    const dialogRef = this.dialog.open(DeletedialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.user.deleteUsers(this.token, deleteuser.id).subscribe({
          next: (res: any) => {
            this.data();
          },
          error: (err: any) => {
            console.error('Error deleting user:', err);
          }
        });
      }
  });
  }


  toggleuserform() {
    this.toggleform = !this.toggleform;
    this.reset();
  }

  reset() {
    this.userform.clearValidators();
    this.userform.reset();
  }
} 
