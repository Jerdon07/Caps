<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

class CropFactory extends Factory
{
    public function definition(): array
    {
        $id = fake()->numberBetween(1, 50);

        return [
            'category_id' => Category::factory(),
            'name'        => fake()->unique()->word(),
            'image_path'  => "https://picsum.photos/id/{$id}/640/480",
            'crop_weeks' => fake()->numberBetween(4, 20),
            
        ];
    }
}
