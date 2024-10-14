import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']

})


export class UsersComponent implements OnInit {

  token = localStorage.getItem('token');
  userData!: any;
  profileData!: any;
  constructor(private userhttp: UserService, private tokenhttp: LoginService, private router: Router) { }

  ngOnInit() {
    if (!this.token) {
      this.router.navigateByUrl('login');
    } else {
      this.data();
      this.profiledata();
    }
  }

  data() {
    this.userhttp.getUsers(this.token).subscribe(data => {
      console.log('User data:', data);
      this.userData = data;
    }, error => {
      console.error('Error fetching users:', error);
    });
  }
  profiledata() {
    this.tokenhttp.profileUser(this.token).subscribe(users => {
      this.profileData = users;
    }, error => {
      console.error('Error fetching profile data:', error);
    });
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

}
