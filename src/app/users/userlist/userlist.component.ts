import { Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  toggleform: boolean = false;
  displayedColumns: string[] = ['position', 'name', 'email', 'userrole','status','edit','delete'];
  token = localStorage.getItem('token');
  userData: any;


  userform!: FormGroup;
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private user: UserService, private router: Router, private fb: FormBuilder) { 
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
      this.user.postUsers(this.token, name, email, userrole, password, status).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('userlist');
          this.data();
          this.userform.clearValidators();
          this.userform.reset();
          this.toggleform = false;
        }
      })
    } else {
      console.log("error happening");
    }
  }
  toggleuserform() {
    this.toggleform = !this.toggleform;
  }
} 
