<?php

// Create a migration for the books table
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('external_id');
            $table->string('source');
            $table->string('title');
            $table->string('author');
            $table->string('cover_image')->nullable();
            $table->timestamps();

            $table->unique(['external_id', 'source']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('books');
    }
}
