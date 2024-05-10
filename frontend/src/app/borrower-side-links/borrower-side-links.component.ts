import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-borrower-side-links',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './borrower-side-links.component.html',
  styleUrl: './borrower-side-links.component.css',
})
export class BorrowerSideLinksComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.tokenService.removeToken();
      this.router.navigate(['']);
    });
  }
}
