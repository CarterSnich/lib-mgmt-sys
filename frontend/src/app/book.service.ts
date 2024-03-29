import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8000/api/books');
  }

  addBook(book: Book) {
    this.http.post('http://localhost:8000/api/books/add', book).subscribe();
  }

  deleteBook(book_id: string) {
    this.http
      .delete(`http://localhost:8000/api/books/${book_id}/delete`)
      .subscribe();
  }

  updateBook(book_id: string, book: Book) {
    this.http
      .put(`http://localhost:8000/api/books/${book_id}/update`, book)
      .subscribe();
  }
}
