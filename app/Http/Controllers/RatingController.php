<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Rating;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RatingController extends Controller
{
    public function store(Request $request, $isbn)
    {
        Log::info("Received ISBN: " . $isbn);
        try {
            $validated = $request->validate([
                'rating' => 'required|integer|min:1|max:5',
                'title' => 'required|string',
                'author' => 'required|string',
            ]);

            // Find or create the book based on ISBN
            $book = Book::firstOrCreate(
                ['isbn' => $isbn],
                [
                    'title' => $validated['title'], 
                    'author' => $validated['author'],
                    'isbn' => $isbn,
                    'external_id' => $isbn,
                    'source' => 'Google Books',
                    'cover_image' => 'default'
                ]
            );

            $rating = new Rating();
            $rating->rating = $validated['rating'];
            $rating->user_id = $request->user()->id ?? 1;

            $book->ratings()->save($rating);

            return response()->json($rating, 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }
}
