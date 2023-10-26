<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        User::updateOrcreate(['username' => 'israelnkum'],
            [
                'username' => 'israelnkum',
                'email' => 'israelnkum@gmail.com',
                'password' => Hash::make(1)
            ]
        );
    }
}
