<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\Book;
use App\Models\User;
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
        // User::factory(10)->create();

        User::factory()->create([
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin'),
            'fullname' => 'Administrator'
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
                'name' => Str::title(fake()->words(true)),
                'isbn' => fake()->isbn13(),
                'author' => fake()->name(),
                'price' => fake()->numberBetween(100, 10000),
                'issued_date' => $issuedDate,
                'due_date' => $dueDate,
                'returned_date' => $returnedDate
            ]);
        }
    }
}
