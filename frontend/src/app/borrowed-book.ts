import Book from './book';
import { User } from './shared/auth.service';

export interface BorrowedBook {
  id?: number;
  book: Book;
  user: User;
  quantity: number;
  total: number;
  created_at: Date;
}
