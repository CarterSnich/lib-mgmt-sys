import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BorrowedBook } from '../borrowed-book';
import { AuthService, User } from '../shared/auth.service';

@Component({
  selector: 'app-borrowed-books',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.css',
})
export class BorrowedBooksComponent implements OnInit {
  user?: User;
  borrowedBooks: BorrowedBook[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.authService.profileUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      complete() {},
      error: (err) => {
        console.error(err);
        if (err.status == 401) {
          this.router.navigate(['']);
        }
      },
    });

    this.getBorrowedBooks();
  }

  getBorrowedBooks() {
    this.httpClient
      .get<BorrowedBook[]>('http://localhost:8000/api/borrowed-books/user')
      .subscribe((borrowedBooks) => {
        this.borrowedBooks = borrowedBooks;
      });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
