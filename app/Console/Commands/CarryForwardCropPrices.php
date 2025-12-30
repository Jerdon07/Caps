<?php

namespace App\Console\Commands;

use App\Models\Crop;
use App\Models\CropPrice;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CarryForwardCropPrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:carry-forward-crop-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description =
        "Force saturday recordings of a crop prices if the admin didn't record it";

    /**
     * Execute the console command.
     */
    public function handle()
    {
        foreach (Crop::all() as $crop) {
            $lastPrice = $crop->prices()->latest('recorded_at')->first();
            
            if (!$lastPrice || $lastPrice->recorded_at < Carbon::now()->startOfWeek(Carbon::SATURDAY)) {
                CropPrice::create([
                    'crop_id' => $crop->id,
                    'price_min' => $lastPrice->price_min,
                    'price_max' => $lastPrice->price_max,
                    'recorded_at' => Carbon::now()->next(Carbon::SATURDAY),
                ]);
            }
        }
    }
}
