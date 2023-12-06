<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RatingController extends Controller
{
    public function storeOrUpdateRating(Request $request)
    {
        Log::info('Incoming rating request:', $request->all());
        try {
            $validated = $request->validate([
                'rating' => 'required|integer|min:1|max:5',
                'isbn' => 'sometimes|string',
                'book_id' => 'sometimes|integer',
                'title' => 'sometimes|string',
                'author' => 'sometimes|string',
            ]);        

            $userId = Auth::id() ?? 1;

            if (isset($validated['isbn'])) {
                // Find or create the book based on ISBN
                $book = Book::firstOrCreate(
                    ['isbn' => $validated['isbn']],
                    [
                        'title' => $validated['title'], 
                        'author' => $validated['author'],
                        'isbn' => $validated['isbn'],
                        'external_id' => $validated['isbn'],
                        'source' => 'Google Books',
                        'cover_image' => 'default'
                    ]
                );
            } elseif (isset($validated['book_id'])) {
                $book = Book::findOrFail($validated['book_id']);
            } else {
                return response()->json(['error' => 'Invalid request'], 400);
            }

            $rating = Rating::updateOrCreate(
                ['user_id' => $userId, 'book_id' => $book->id],
                ['rating' => $validated['rating']]
            );
        
            return response()->json($rating, 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'An error occurred while processing the rating'], 500);
        }
    }
}
