<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Jethro',
                'email' => 'jethro@gmail.com',
                'password' => Hash::make('12345678'),
            ],
            [
                'name' => 'Test',
                'email' => 'test@gmail.com',
                'password' => Hash::make('12345678'),
            ],
            [
                'name' => 'Nathan',
                'email' => 'nathan@gmail.com',
                'password' => Hash::make('12345678'),
            ],
        ];

        User::insert($data);
    }
}
