import {ChangeDetectionStrategy, Component, signal, OnInit} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {merge} from 'rxjs';
import { LoginService } from 'src/app/service/login/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
  

export class LoginComponent implements OnInit{

  form!: FormGroup;
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errormessage!: string;
  constructor(private fb: FormBuilder, private http: LoginService, private router: Router) {
    this.form = this.fb.group({
      email: this.email,
      password:['',[Validators.required]]
    })
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit(): void {
    this.errorMessage;
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

  submit(event:Event) {
    event.preventDefault();
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.http.loginUser(email, password).subscribe(
        response => {
          const token = response.token;
          localStorage.setItem('token', token);
          this.router.navigateByUrl('users');
        },
        error => {
          this.errormessage="Invalid username or password"
          console.error('Login failed', error);
        }
      );
    }
  }


  
}
