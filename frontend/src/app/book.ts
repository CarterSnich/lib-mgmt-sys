interface Book {
  id?: number;
  isbn: string;
  name: string;
  author: string;
  year: number;
  price: number;
  quantity: number;
  issued_date?: string;
  due_date?: string;
  returned_date?: string;
}

export default Book;
