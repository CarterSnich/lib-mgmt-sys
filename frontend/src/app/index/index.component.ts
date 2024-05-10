import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../shared/auth-state.service';
import { TokenService } from '../shared/token.service';
import { User } from '../user';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = null;
  user?: User;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }
  ngOnInit() {
    this.authService.profileUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      complete: () => {
        switch (this.user?.type) {
          case 'Administrator':
          case 'Librarian':
            this.router.navigate(['dashboard']);
            break;

          case 'Borrower':
            this.router.navigate(['borrower']);
            break;
        }
      },
      error: (err) => {
        if (err.status != 401) {
          console.error(err);
        }
      },
    });
  }

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe({
      next: (result) => {
        this.responseHandler(result);
      },
      complete: () => {
        this.loginForm.reset();
        this.authState.setAuthState(true);
        this.authService.profileUser().subscribe({
          next: (user) => {
            this.user = user;
          },
          complete: () => {
            switch (this.user?.type) {
              case 'Administrator':
              case 'Librarian':
                this.router.navigate(['dashboard']);
                break;

              case 'Borrower':
                this.router.navigate(['borrower']);
                break;
            }
          },
          error: (err) => {
            if (err.status != 401) {
              console.error(err);
            }
          },
        });
      },
      error: (error) => {
        console.error(error);
        this.errors = error.error;
      },
    });
  }
  // Handle response
  responseHandler(data: any) {
    this.token.handleData(data.access_token);
  }
}
