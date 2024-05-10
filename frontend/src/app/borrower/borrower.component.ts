import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Book from '../book';
import { BookService } from '../book.service';
import { BorrowerSideLinksComponent } from '../borrower-side-links/borrower-side-links.component';
import Pagination from '../pagination';
import { AuthService, User } from '../shared/auth.service';

@Component({
  selector: 'app-borrower',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    BorrowerSideLinksComponent,
  ],
  templateUrl: './borrower.component.html',
  styleUrl: './borrower.component.css',
})
export class BorrowerComponent implements OnInit {
  user?: User;
  books: Book[] = [];

  pagination: Pagination = {
    current_page: 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 20,
    to: 0,
    total: 0,
  };

  bookToBorrow: Book = {
    isbn: '',
    name: '',
    author: '',
    year: 0,
    price: 0,
    quantity: 0,
  };

  bookBorrowForm = this.formBuilder.group({
    quantity: 1,
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private bookService: BookService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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

    this.getBooks(
      this.pagination.current_page,
      undefined,
      this.pagination.per_page
    );
  }

  getBooks(page: number, query?: string, perPage?: number) {
    this.bookService.getBooks(page, query, perPage).subscribe({
      next: (pagination) => {
        this.pagination = pagination;
        this.books = pagination.data;
      },
      complete: () => {},
      error: (err) => {
        console.error(err);
        document.getElementById('error-message')?.classList.remove('d-none');
      },
    });
  }

  pageSelect(event: any) {
    const perPage = event.target.value;
    this.getBooks(this.pagination.current_page, undefined, perPage);
  }

  prevPage() {
    this.getBooks(
      this.pagination.current_page - 1,
      undefined,
      this.pagination.per_page
    );
  }

  nextPage() {
    this.getBooks(
      this.pagination.current_page + 1,
      undefined,
      this.pagination.per_page
    );
  }

  clickBook(book: Book) {
    this.bookToBorrow = book;
  }

  submitBorrowBook() {
    let quantity = <number>this.bookBorrowForm.value.quantity;
    let price = this.bookToBorrow.price;
    let total = quantity * price;
    let book = this.bookToBorrow;

    this.bookService.borrowBook(quantity, total, book).subscribe({
      complete: () => {
        alert('Book borrowed.');
        this.getBooks(
          this.pagination.current_page,
          undefined,
          this.pagination.per_page
        );
        this.bookBorrowForm = this.formBuilder.group({
          quantity: 1,
        });
      },
      error(err) {
        console.error(err);
        alert('Failed to borrow book.');
      },
    });
  }
}
