<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use App\Models\CropPrice;
use Carbon\Carbon;
use Inertia\Inertia;

class PriceTrends extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $trends =  $this->getTopCropsTrends(5);
        $marketMovers = $this->getMarketMovers();
        $volatilityAlert = $this->getVolatilityAlert();
        $marketPulse = $this->getMarketPulse();

        return Inertia::render('admin/price-trends/index', [
            'trends' => $trends,
            'marketMovers' => $marketMovers,
            'volatilityAlert' => $volatilityAlert,
            'marketPulse' => $marketPulse,
        ]);
    }

    private function getTopCropsTrends(int $limit = 5): array
    {
        /* Get top crops (By most recent price activity) */
        $topCrops = Crop::withCount('prices')
            ->has('prices', '>', 0)
            ->orderBy('prices_count', 'desc')
            ->limit($limit)
            ->get();

        return $topCrops->map(function ($crop) {
            $prices = CropPrice::where('crop_id', $crop->id)
                ->orderBy('recorded_at')
                ->get(['recorded_at', 'price_min', 'price_max']);

            $filtered = collect();
            $previousAverage = null;

            foreach ($prices as $price) {
                $currentAverage = ($price->price_min + $price->price_max) / 2;

                if ($previousAverage === null || $currentAverage != $previousAverage) {
                    $filtered->push([
                        'date' => $price->recorded_at->format('Y-m-d'),
                        'average_price' => round($currentAverage, 2),
                    ]);

                    $previousAverage = $currentAverage;
                }
            }

            return [
                'crop_id' => $crop->id,
                'crop_name' => $crop->name,
                'category_name' => $crop->category->name,
                'data' => $filtered->values()->toArray(),
            ];
        })->toArray();
    }

    /* 
        Get crop with largest current price gap (volatility)
    */
    private function getMarketMovers(): array
    {
        $crops = Crop::with(['prices' => function ($query) {
            $query->latest('recorded_at')->limit(2);
        }])->get();

        $movers = collect();

        foreach ($crops as $crop) {
            if ($crop->prices->count() >=2) {
                $latest = $crop->prices[0];
                $previous = $crop->prices[1];

                $latestAvg = ($latest->price_min + $latest->price_max) / 2;
                $previousAvg = ($previous->price_min + $previous->price_max) / 2;

                if ($previousAvg > 0) {
                    $percentChange = (($latestAvg - $previousAvg) / $previousAvg) * 100;

                    $movers->push([
                        'crop_id' => $crop->id,
                        'crop_name' => $crop->name,
                        'crop_image' => $crop->image_path,
                        'category_name' => $crop->category->name,
                        'current_price' => round($latestAvg, 2),
                        'previous_price' => round($previousAvg, 2),
                        'percent_change' => round($percentChange, 2),
                        'direction' => $percentChange > 0 ? 'up' : 'down',
                    ]);
                }
            }
        }
        return $movers
            ->sortByDesc(fn($item) => abs($item['percent_change']))
            ->take(3)
            ->values()
            ->toArray();
    }

    /* 
        Get crop with largest current price gap(volatility)
    */
    private function getVolatilityAlert(): array
    {
        $subquery = CropPrice::selectRaw('crop_id, MAX(recorded_at) as max_date')
            ->groupBy('crop_id');

        $latestPrices = CropPrice::select('crop_prices.*')
            ->joinSub($subquery, 'sub', function ($join) {
                $join->on('crop_prices.crop_id', '=', 'sub.crop_id')
                    ->on('crop_prices.recorded_at', '=', 'sub.max_date');
            })
            ->with('crop.category')
            ->get();
        
            return $latestPrices
            ->map(function ($price) {
                $gap = $price->price_max - $price->price_min;
                
                return [
                    'crop_id' => $price->crop->id,
                    'crop_name' => $price->crop->name,
                    'category_name' => $price->crop->category->name,
                    'price_min' => (float) $price->price_min,
                    'price_max' => (float) $price->price_max,
                    'gap' => round($gap, 2),
                    'recorded_at' => $price->recorded_at->format('Y-m-d'),
                ];
            })
            ->sortByDesc('gap')
            ->take(3)
            ->values()
            ->toArray();
    }

    /* 
        Get count of crops that changed vs stayed same in last 7 days
    */
    private function getMarketPulse(): array
    {
        $sevenDaysAgo = Carbon::now()->subDays(7);
        
        $crops = Crop::with(['prices' => function ($query) use ($sevenDaysAgo) {
            $query->where('recorded_at', '>=', $sevenDaysAgo)
                ->orWhere('recorded_at', '<', $sevenDaysAgo)
                ->orderBy('recorded_at', 'desc')
                ->limit(2);
        }])->get();
        
        $changed = 0;
        $unchanged = 0;
        
        foreach ($crops as $crop) {
            if ($crop->prices->isEmpty()) {
                continue; // Skip crops with no price data
            }
            
            $recentPrices = $crop->prices->where('recorded_at', '>=', $sevenDaysAgo);
            
            if ($recentPrices->isEmpty()) {
                $unchanged++; // No activity in last 7 days
                continue;
            }
            
            // Get most recent and the one before it
            $latest = $crop->prices[0];
            $previous = $crop->prices->count() > 1 ? $crop->prices[1] : null;
            
            if ($previous) {
                $latestAvg = ($latest->price_min + $latest->price_max) / 2;
                $previousAvg = ($previous->price_min + $previous->price_max) / 2;
                
                if ($latestAvg != $previousAvg) {
                    $changed++;
                } else {
                    $unchanged++;
                }
            } else {
                $changed++; // First price record counts as change
            }
        }
        
        return [
            'changed' => $changed,
            'unchanged' => $unchanged,
            'total' => $changed + $unchanged,
            'change_rate' => $changed + $unchanged > 0 
                ? round(($changed / ($changed + $unchanged)) * 100, 1) 
                : 0,
        ];
    }
}
