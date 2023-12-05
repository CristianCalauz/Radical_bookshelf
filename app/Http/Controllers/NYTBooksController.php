<?php

namespace App\Http\Controllers;

use App\Services\NYTimesBookService;
use Illuminate\Http\Request;

class NYTBooksController extends Controller
{
    protected $nytService;

    public function __construct(NYTimesBookService $nytService)
    {
        $this->nytService = $nytService;
    }

    public function index()
    {
        $bestSellers = $this->nytService->getBestSellers();
        // Optionally process the data as needed
        return response()->json($bestSellers);
    }
}
