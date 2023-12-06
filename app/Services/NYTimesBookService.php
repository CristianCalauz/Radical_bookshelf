<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Services\BookService;

class NYTimesBookService
{
    protected $baseUri;
    protected $apiKey;
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->baseUri = 'https://api.nytimes.com/svc/books/v3/';
        $this->apiKey = env('NYTIMES_API_KEY');
        $this->bookService = $bookService;
    }

    public function getBestSellers()
    {
        try {
            $response = Http::get("{$this->baseUri}/lists/combined-print-and-e-book-fiction.json", [
                'api-key' => $this->apiKey
            ]);

            if ($response->successful()) {
                $bestsellers = $response->json();

                if (!isset($bestsellers['results']['books']) || !is_array($bestsellers['results']['books'])) {
                    logger()->error('NYT API Error: "books" key not found in response.');
                    return response()->json(['error' => '"books" key not found in response'], 500);
                }

                foreach ($bestsellers['results']['books'] as &$book) {
                    $isbn = $book['primary_isbn13'] ?? $book['primary_isbn10'];
                    $googleBooksDetails = $this->getBookDetailsWithISBN($isbn);

                    $book['rating'] = $googleBooksDetails['rating'] ?? 0;
                    $book['price'] = $googleBooksDetails['price'] ?? "No price";
                    $book['customRating'] = $this->bookService->getAverageRatingByISBN($isbn);

                    $userId = auth()->id() ?? 1;
                    $book['isFavorited'] = $this->bookService->isBookFavoritedByUser($isbn, $userId);
                }

                return $bestsellers;
            } else {
                logger()->error('NYT API Error: ' . $response->body());
                return response()->json(['error' => 'Failed to fetch data from NYT API'], 500);
            }
        } catch (\Exception $e) {
            logger()->error('NYT API Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function getBookDetailsWithISBN($isbn)
    {
        $googleBooksApiKey = env('GOOGLE_BOOKS_API_KEY');
        $googleBooksResponse = Http::get("https://www.googleapis.com/books/v1/volumes", [
            'q' => 'isbn:' . $isbn,
            'key' => $googleBooksApiKey,
            'country' => 'US'
        ]);
        
        if ($googleBooksResponse->successful()) {
            $bookDetails = $googleBooksResponse->json();
    
            $rating = 0;
            $price = "No price";

            if (isset($bookDetails['items'][0]['volumeInfo']['averageRating'])) {
                $rating = $bookDetails['items'][0]['volumeInfo']['averageRating'];
            }

            if (isset($bookDetails['items'][0]['saleInfo']['listPrice']['amount'])) {
                $price = $bookDetails['items'][0]['saleInfo']['listPrice']['amount'] . ' ' . $bookDetails['items'][0]['saleInfo']['listPrice']['currencyCode'];
            }
    
            return [
                'rating' => $rating,
                'price' => $price
            ];
        } else {
            logger()->error('Google Books API Error: ' . $googleBooksResponse->body());
            return null;
        }
    }
}
