<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Drill;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Drill::factory(5)->create([
            'user_id' =>'1',
            // 'category_id' => fake()->numberBetween(1,4)
    ]);
    }
}
