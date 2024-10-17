import { ChangeDetectionStrategy, Component, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { LoginService } from 'src/app/service/login/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class LoginComponent implements OnInit {

  form!: FormGroup;
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errormessage!: string;
  toastr: any;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: LoginService,
    private router: Router) {
    this.form = this.fb.group({
      email: this.email,
      password: ['', [Validators.required]]
    })
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit(): void {
    // this.errorMessage;
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

  submit(event: Event) {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.http.loginUser(email, password).subscribe({
        next: (res: any) => {
          const token = res.token;
          this.cdr.detectChanges();
          localStorage.setItem('token', token);
          this.router.navigateByUrl('userlist');
        },
        error: (err: any) => {
          this.errormessage = "Invalid email or password";
          this.cdr.detectChanges();
        }
      });
    }
  }




}
