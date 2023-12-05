<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function getCurrentUser()
    {
        $user = Auth::user() ?? User::find(1);
    
        Log::info('Fetching current user. User ID: ' . ($user ? $user->id : 'none'));
    
        return response()->json($user);
    }

    public function switchUser($userId)
    {
        Log::info('Switching user. Requested User ID: ' . $userId);

        Auth::loginUsingId($userId);
    
        $currentUser = Auth::user();
        Log::info('User switched. Current User ID: ' . $currentUser->id);
    
        return response()->json(['message' => 'User switched']);
    }
}
