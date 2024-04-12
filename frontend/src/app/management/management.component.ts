import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Book from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule, FormsModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
})
export class ManagementComponent {
  books: Book[] = [];

  bookEditable = '';

  addBookForm = this.formBuilder.group<Book>({
    book_id: '',
    book_name: '',
    book_price: 0,
  });

  editBookId = '';
  editBookName = '';
  editBookPrice = 0;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  deleteBook(book_id: string) {
    this.bookService.deleteBook(book_id);
    this.getBooks();
  }

  setBookEditable(book: Book) {
    this.bookEditable = book.book_id;
    this.editBookId = book.book_id;
    this.editBookName = book.book_name;
    this.editBookPrice = book.book_price;
  }

  updateBook(book_id: string) {
    this.bookService.updateBook(book_id, {
      book_id: this.editBookId,
      book_name: this.editBookName,
      book_price: this.editBookPrice,
    });
    this.bookEditable = '';
    this.getBooks();
  }

  onSubmit(): void {
    this.bookService.addBook(<Book>this.addBookForm.value);
    this.addBookForm.reset();
    this.getBooks();
  }
}
