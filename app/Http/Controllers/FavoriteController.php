<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{
    public function index()
    {
        $userId = Auth::id() ?? 1;
    
        $favorites = Favorite::with(['book', 'book.ratings'])
                        ->where('user_id', $userId)
                        ->get()
                        ->map(function ($favorite) {
                            $book = $favorite->book;
                            $book->averageRating = $book->ratings->avg('rating');
                            return $book;
                        });
    
        return response()->json($favorites);
    }
    
    public function store(Request $request, Book $book)
    {
        $favorite = new Favorite();
        $favorite->user_id = $request->user()->id;
        $book->favorites()->save($favorite);

        return response()->json($favorite, 201);
    }

    public function destroy($id)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->delete();
    
        return response()->json(['message' => 'Favorite book deleted successfully.']);
    }

    public function toggleFavorite(Request $request)
    {
        try {
            $userId = Auth::id() ?? 1;
            $isbn = $request->input('isbn');
            $title = $request->input('title');
            $author = $request->input('author');
            $coverImage = $request->input('cover_image') ?? 'default_image_link';
    
            $book = Book::firstOrCreate(
                ['isbn' => $isbn],
                ['title' => $title, 'author' => $author, 'cover_image' => $coverImage, 'external_id' => $isbn, 'source' => 'Google Books']
            );
    
            $favorite = Favorite::where('user_id', $userId)->where('book_id', $book->id)->first();
    
            if ($favorite) {
                $favorite->delete();
                return response()->json(['message' => 'Book removed from favorites']);
            } else {
                $favorite = new Favorite();
                $favorite->user_id = $userId;
                $favorite->book_id = $book->id;
                $favorite->save();
                return response()->json(['message' => 'Book added to favorites']);
            }
        } catch (\Exception $e) {
            Log::error('Error toggling favorite: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }    
}
