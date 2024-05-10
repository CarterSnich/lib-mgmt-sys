import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminSideLinksComponent } from '../admin-side-links/admin-side-links.component';
import { User } from '../user';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AdminSideLinksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user?: User;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.profileUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      complete: () => {},
      error: (err) => {
        console.error(err);
        if (err.status == 401) {
          this.router.navigate(['']);
        }
      },
    });
  }
}
