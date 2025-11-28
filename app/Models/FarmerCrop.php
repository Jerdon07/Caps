<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class FarmerCrop extends Pivot
{
    protected $table = 'farmer_crop';

    protected $primaryKey = 'plant_id';

    protected $fillable = [
        'farmer_id',
        'crop_id',
        'yield_kg',
        'planting_date',
        'harvesting_date'
    ];

    protected $casts = [
        'planting_date' => 'date',
        'harvesting_date' => 'date'
    ];
    
    public function farmer(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'farmer_id', 'farmer_id');
    }

    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class, 'crop_id', 'crop_id');
    }
}
