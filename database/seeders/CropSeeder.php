<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Crop;

class CropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $crops = [
            ['category_id' => 1, 'name' => 'Carrot', 'price_min' => 40, 'price_max' => 80, 'crop_weeks' => 10],
            ['category_id' => 1, 'name' => 'Cabbage', 'price_min' => 30, 'price_max' => 60, 'crop_weeks' => 12],
            ['category_id' => 2, 'name' => 'Banana', 'price_min' => 50, 'price_max' => 100, 'crop_weeks' => 52],
        ];

        foreach ($crops as $crop) {
            Crop::FirstOrCreate(
                ['category_id' => $crop['category_id'], 'name' => $crop['name']],
                $crop
            );
        }

    }
}
