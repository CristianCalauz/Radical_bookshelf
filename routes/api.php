<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\NYTBooksController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Books routes
Route::apiResource('books', BookController::class);

// Favorites routes
Route::post('books/{book}/favorite', [FavoriteController::class, 'store']);
Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']);

Route::get('/nyt-bestsellers', [NYTBooksController::class, 'index']);

Route::get('/favorites', [FavoriteController::class, 'index']);
Route::post('/favorite', [FavoriteController::class, 'toggleFavorite']);

Route::post('/books/{isbn}/ratings', [RatingController::class, 'store']);

Route::get('/current-user', [UserController::class, 'getCurrentUser']);
Route::get('/switch-user/{userId}', [UserController::class, 'switchUser']);
