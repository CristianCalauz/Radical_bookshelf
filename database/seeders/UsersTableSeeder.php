<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'id' => '1',
            'name' => 'User One',
            'email' => 'userone@example.com',
            'password' => bcrypt('password'),
            'profile_picture' => 'https://mir-s3-cdn-cf.behance.net/projects/404/b32da2163666637.Y3JvcCwxNjU0LDEyOTMsMCw1MjQ.png', // Example path
            // ... other necessary attributes
        ]);

        User::create([
            'id' => '2',
            'name' => 'User Two',
            'email' => 'usertwo@example.com',
            'password' => bcrypt('password'),
            'profile_picture' => 'https://static.wikia.nocookie.net/mrmsco/images/c/cb/Utonium_21.jpeg/revision/latest/thumbnail/width/360/height/360?cb=20220326171928', // Example path
            // ... other necessary attributes
        ]);
    }
}