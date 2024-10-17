import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { SidebarService } from 'src/app/service/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  token = localStorage.getItem('token');
  userData!:any;
  constructor(private sidebarService: SidebarService, private router: Router, private tokenhttp: LoginService) { }
  

  ngOnInit(): void {
    if (!this.token) {
      this.userData = '';
      this.router.navigateByUrl('login');
    } else {
      this.tokenVerification()
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  tokenVerification() {
    this.tokenhttp.profileUser(this.token).subscribe(data => {
      this.userData = data;
    })
  }
}
