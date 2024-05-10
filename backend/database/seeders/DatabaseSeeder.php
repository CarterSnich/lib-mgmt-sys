<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\Book;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'email' => 'admin@library.com',
            'password' => Hash::make('password'),
            'fullname' => 'Ad Min Istrator',
            'type' => 'Administrator'
        ]);

        User::factory()->create([
            'email' => 'librarian@library.com',
            'password' => Hash::make('password'),
            'fullname' => 'Libra Rian',
            'type' => 'Librarian'
        ]);


        User::factory()->create([
            'email' => 'borrower@library.com',
            'password' => Hash::make('password'),
            'fullname' => 'Bor Rower',
            'type' => 'Borrower'
        ]);

        for ($i = 0; $i < 10000; $i++) {
            $issuedDate = fake()->date();
            $dueDate = null;
            $returnedDate = null;

            if (fake()->boolean()) {
                $dueDate = fake()->date();
                $returnedDate = fake()->date(max: $dueDate);
            }

            Book::factory()->create([
                'name' => Str::title(fake()->words(asText: true)),
                'isbn' => fake()->isbn13(),
                'author' => fake()->name(),
                'year' => fake()->year(Carbon::now()),
                'price' => fake()->numberBetween(100, 10000),
                'quantity' => fake()->numberBetween(0, 100),
                'issued_date' => $issuedDate,
                'due_date' => $dueDate,
                'returned_date' => $returnedDate
            ]);
        }
    }
}
