import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminSideLinksComponent } from '../admin-side-links/admin-side-links.component';
import Book from '../book';
import { BookService } from '../book.service';
import Pagination from '../pagination';
import { AuthService, User } from '../shared/auth.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    AdminSideLinksComponent,
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
})
export class ManagementComponent {
  user?: User;

  pagination: Pagination = {
    current_page: 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 20,
    to: 0,
    total: 0,
  };
  books: Book[] = [];
  addBookForm = this.formBuilder.group<Book>({
    isbn: '',
    name: '',
    price: 0,
    author: '',
    year: 0,
    quantity: 0,
  });

  editBookForm = this.formBuilder.group<Book>({
    isbn: '',
    name: '',
    price: 0,
    author: '',
    year: 0,
    quantity: 0,
  });
  editableBook: Book | undefined;

  searchQuery = '';

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.profileUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err) => {
        console.error(err);
        if ((err.status = 401)) {
          this.router.navigate(['']);
        }
      },
    });

    this.getBooks(this.pagination.current_page);
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

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe({
      complete: () => {
        alert('Book deleted');
        this.getBooks(this.pagination.current_page);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setBookEditable(book: Book) {
    this.editableBook = book;
    this.editBookForm = this.formBuilder.group<Book>(book);
  }

  updateBook(id: number | undefined) {
    this.bookService
      .updateBook(<number>id, <Book>this.editBookForm.value)
      .subscribe({
        complete: () => {
          this.editableBook = undefined;
          this.getBooks(this.pagination.current_page);
        },
      });
  }

  onSubmit(): void {
    this.bookService.addBook(<Book>this.addBookForm.value).subscribe({
      complete: () => {
        this.addBookForm.reset();
        this.getBooks(this.pagination.current_page);
      },
      error(err) {
        console.error(err);
        alert('Failed to add book.');
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

  fakeArray(count: any): number[] {
    return Array(count)
      .fill(0)
      .map((x, i) => i);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
