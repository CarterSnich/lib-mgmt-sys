import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminSideLinksComponent } from '../admin-side-links/admin-side-links.component';
import { BorrowedBook } from '../borrowed-book';
import Pagination from '../pagination';
import { User } from '../shared/auth.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  imports: [CommonModule, AdminSideLinksComponent],
})
export class TransactionsComponent implements OnInit {
  user?: User;
  isReturned: boolean = true;
  borrowedBooks: BorrowedBook[] = [];

  pagination: Pagination = {
    current_page: 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 20,
    to: 0,
    total: 0,
  };

  constructor(private router: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.router.data.subscribe((data) => {
      this.isReturned = data['isReturned'];
    });
    this.getBorrowedBooks(
      this.pagination.current_page,
      this.pagination.per_page
    );
  }

  getBorrowedBooks(page: number, perPage: number) {
    const url = `http://localhost:8000/api/borrowed-books?isReturned=${this.isReturned}`;
    this.httpClient.get<Pagination>(url).subscribe({
      next: (pagination) => {
        this.pagination = pagination;
        this.borrowedBooks = pagination.data;
      },
      complete: () => {},
      error: (err) => {
        alert('Failed to fetch borrowed books.');
        console.error(err);
      },
    });
  }

  pageSelect(event: any) {
    const perPage = event.target.value;
    this.getBorrowedBooks(this.pagination.current_page, perPage);
  }

  prevPage() {
    this.getBorrowedBooks(
      this.pagination.current_page - 1,
      this.pagination.per_page
    );
  }

  nextPage() {
    this.getBorrowedBooks(
      this.pagination.current_page + 1,
      this.pagination.per_page
    );
  }

  returnBorrow(bb: BorrowedBook) {
    if (confirm('Return book?')) {
      this.httpClient
        .put(`http://localhost:8000/api/borrowed-books/${bb.id}/return`, {})
        .subscribe({
          complete: () => {
            alert('Book retuned.');
            this.getBorrowedBooks(
              this.pagination.current_page,
              this.pagination.per_page
            );
          },
          error: (err) => {
            console.error(err);
            alert('Failed to return book.');
          },
        });
    }
  }
}
