import { Component } from '@angular/core';
import { SidebarService } from '../service/sidebar/sidebar.service';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  isSidebarVisible = true;
  token = localStorage.getItem('token');
  isLoginPage = true;

  constructor(private sidebarService: SidebarService,private router: Router) {}
  ngOnInit() {
    if (!this.token) {
      this.router.navigateByUrl('login');
    } else {
      this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
        console.log(isVisible)
        this.isSidebarVisible = isVisible;
      });
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isLoginPage = this.router.url.includes('login');
        }
      });
    }
  }
  
}
