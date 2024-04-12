<?php

namespace Database\Seeders;

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

        Book::factory()->create([
            'book_id' => '49841531',
            'book_name' => 'The Book',
            'book_price' => 10000
        ]);
    }
}
