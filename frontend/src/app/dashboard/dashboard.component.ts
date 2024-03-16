import { Component } from '@angular/core';
import { AuthService } from './../shared/auth.service';
export class User {
  email: any;
  fullname: any;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  UserProfile!: User;

  constructor(public authService: AuthService) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }
}
