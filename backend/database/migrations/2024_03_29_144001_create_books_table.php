<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('isbn')->unique();
            $table->string('author');
            $table->unsignedBigInteger('price');
            $table->date('issued_date')->nullable();
            $table->date('due_date')->nullable();
            $table->date('returned_date')->nullable();

            $table->$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
