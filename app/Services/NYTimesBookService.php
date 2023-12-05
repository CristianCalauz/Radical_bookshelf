<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NYTimesBookService
{
    protected $baseUri;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUri = 'https://api.nytimes.com/svc/books/v3/';
        $this->apiKey = env('NYTIMES_API_KEY');
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
        
                    // Merge Google Books data
                    $book['rating'] = $googleBooksDetails['rating'] ?? 0;
                    $book['price'] = $googleBooksDetails['price'] ?? "No price";
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
    
            // Default values for rating and price
            $rating = 0;
            $price = "No price";
    
            // Check if rating is available
            if (isset($bookDetails['items'][0]['volumeInfo']['averageRating'])) {
                $rating = $bookDetails['items'][0]['volumeInfo']['averageRating'];
            }
    
            // Check if price is available
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
