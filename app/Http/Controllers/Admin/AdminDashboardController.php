<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Crop;
use App\Services\Admin\AdminDashboardService;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __invoke()
    {
        $dashboardData = new AdminDashboardService;

        return Inertia::render('admin/dashboard/index', [
            'stats' => $dashboardData->getStats(),
            'ranks' => $dashboardData->getPriceRanks(),
            'frequency' => $dashboardData->getCropUpdateFrequency(),
            'marketVolatility' => $dashboardData->getMarketVolatility(),
            'topMunicipality' => $dashboardData->getTopMunicipality(),
        ]);
    }
}
