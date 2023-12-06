<?php

namespace App\Services;

use App\Models\Book;
use App\Models\Rating;

class BookService
{
    /**
     * Fetch the average rating for a book by its ISBN.
     *
     * @param string $isbn
     * @return float|null
     */
    public function getAverageRatingByISBN($isbn)
    {
        return Rating::whereHas('book', function ($query) use ($isbn) {
            $query->where('isbn', $isbn);
        })->avg('rating');
    }

    public function isBookFavoritedByUser($isbn, $userId)
    {
        return Book::where('isbn', $isbn)
                ->whereHas('favorites', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                })->exists();
    }

}
