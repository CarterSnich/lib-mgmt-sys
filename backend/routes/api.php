<?php

use App\Models\Book;
use App\Models\BorrowedBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return json_encode([
        'access_token' => $user->createToken($request->email)->plainTextToken
    ]);
});

Route::get('/auth/user-profile', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::delete('/auth/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
})->middleware('auth:sanctum');

Route::get('/books', function (Request $request) {
    $keyword = $request->get('query');
    $perPage = $request->get('perPage', 20);

    if ($keyword) {
        return Book::where(function ($query) use ($keyword) {
            $query
                ->where('isbn', 'like', '%' . $keyword . '%')
                ->orWhere('name', 'like', '%' . $keyword . '%')
                ->orWhere('author', 'like', '%' . $keyword . '%')
                ->orWhere('book.year', 'like', '%' . $keyword . '%');
        })->paginate($perPage);
    } else {
        return Book::paginate($perPage);
    }
});

Route::post('/books/add', function (Request $request) {
    $input = $request->validate([
        'name' => 'required',
        'author' => 'required',
        'price' => ['required', 'numeric'],
        'year' => ['required', 'numeric'],
        'quantity' => ['required', 'numeric']
    ]);

    $input['isbn'] = fake()->isbn13();

    Book::create($input);
});

Route::delete('/books/{book}/delete', function (String $book_id) {
    Book::where('book_id', $book_id)->delete();
});

Route::put('/books/{book}/update', function (Request $request, Book $book) {
    $book->update($request->all());
});

Route::post('/books/{book}/borrow', function (Request $request, Book $book) {
    $quantity = $request->quantity;
    $total = $request->total;

    if ($quantity == 0 || $quantity >= $book->quantity) {
        response(400, 'Invalid book quantity.');
    }

    $borrowedBook = new BorrowedBook();
    $borrowedBook->book_id = $book->id;
    $borrowedBook->user_id = $request->user()->id;
    $borrowedBook->quantity = $quantity;
    $borrowedBook->total = $total;
    $borrowedBook->save();

    $book->quantity = $book->quantity - $quantity;
    $book->save();
})->middleware('auth:sanctum');

Route::get('/borrowed-books', function (Request $request) {
    $keyword = $request->get('query');
    $perPage = $request->get('perPage', 20);
    $isReturned = $request->get('isReturned', true);
    $q = BorrowedBook::with('book')->with('user')
        ->where('is_returned', $isReturned);

    if ($keyword) {
        $q = $q->orWhere(function ($query) use ($keyword) {
            $query
                ->where('book.isbn', 'like', '%' . $keyword . '%')
                ->orWhere('book.name', 'like', '%' . $keyword . '%')
                ->orWhere('book.author', 'like', '%' . $keyword . '%')
                ->orWhere('book.year', 'like', '%' . $keyword . '%');
        });
    }

    return $q->paginate($perPage);
});

Route::get('/borrowed-books/user', function (Request $request) {
    return BorrowedBook::where('user_id', $request->user()->id)
        ->with('book')
        ->with('user')
        ->get();
})->middleware('auth:sanctum');


Route::put('/borrowed-books/{borrowedBook}/return', function (Request $request, BorrowedBook $borrowedBook) {
    $borrowedBook->is_returned = true;
    $borrowedBook->save();

    $book = Book::where('id', $borrowedBook->book_id)->first();
    $book->quantity = $book->quantity + $borrowedBook->quantity;
    $book->save();
});
