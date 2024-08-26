<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Drill>
 */
class DrillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'=> User::factory(),
            'title' => fake()->sentence(),
            'small_description' => fake()->sentence(),
            'description'=> fake()->text(),
            'equipment'=> [
                'key_1' => fake()->word(),
                'key_2' => fake()->word(),
                'key_3' => fake()->word(),
            ],
            'objectives'=> [
                'key_1' => fake()->sentence(),
                'key_2' => fake()->sentence(),
                'key_3' => fake()->sentence(),
            ],
            'difficulty' => 'Advanced',
            'duration' => fake()->numberBetween(0, 30),
            'category_id'=>Category::factory(),
        ];
    }
}
