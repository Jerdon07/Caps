<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    /* Mass Assignment Protection */
    protected $fillable = [
        'category_id', 
        'name',
        'crop_weeks',
        'price_min', 
        'price_max', 
        'recorded_at',
        'image_path'
    ];
    /* Converts a database column value into a specific PHP data type */
    protected $casts = [
        'crop_weeks' => 'integer',
        'price_min' => 'decimal:2',
        'price_max' => 'decimal:2',
        'recorded_at' => 'date',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function farmers()
    {
        return $this->belongsToMany(Farmer::class, 'farmer_crop')
            ->using(FarmerCrop::class)
            ->withPivot(['yield_kg', 'date_planted', 'date_harvested'])
            ->withTimestamps();
    }

    /**
     * Get the average price for this crop
     */
    public function getAveragePriceAttribute(): float
    {
        return ($this->price_min + $this->price_max) / 2;
    }

    /**
     * Get the price range as a formatted string
     */
    public function getPriceRangeAttribute(): string
    {
        return "₱{$this->price_min} - ₱{$this->price_max}";
    }
}
