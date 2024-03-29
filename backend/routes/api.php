<?php

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Psy\Command\WhereamiCommand;

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

Route::get('/books', function () {
    return Book::all();
});

Route::post('/books/add', function (Request $request) {
    $request->validate([
        'book_id' => 'required',
        'book_name' => 'required',
        'book_status' => 'required'
    ]);
    Book::create($request->all());
});


Route::delete('/books/{book_id}/delete', function (String $book_id) {
    Book::where('book_id', $book_id)->delete();
});

Route::put('/books/{book_id}/update', function (Request $request, string $book_id) {
    Book::where('book_id', $book_id)->update($request->all());
});

Route::get('/auth/user-profile', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
