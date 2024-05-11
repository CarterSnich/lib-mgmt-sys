import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from './book';
import Pagination from './pagination';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(
    page: number,
    query?: string,
    perPage?: number
  ): Observable<Pagination> {
    let url = `http://localhost:8000/api/books?page=${page}`;

    if (query) url = `${url}&query=${query}`;
    if (perPage) url = `${url}&perPage=${perPage}`;

    return this.http.get<Pagination>(url);
  }

  addBook(book: Book) {
    console.log(book)
    const url = 'http://localhost:8000/api/books/add';
    return this.http.post(url, book);
  }

  deleteBook(book: Book) {
    const url = `http://localhost:8000/api/books/${book.id}/delete`;
    return this.http.delete(url);
  }

  updateBook(id: number, book: Book) {
    const url = `http://localhost:8000/api/books/${id}/update`;
    return this.http.put(url, book);
  }

  borrowBook(quantity: number, total: number, book: Book) {
    const url = `http://localhost:8000/api/books/${book.id}/borrow`;
    const body = {
      quantity: quantity,
      total: total,
    };

    return this.http.post(url, body);
  }
}
