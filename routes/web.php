<?php

use App\Http\Controllers\Admin\FarmerApprovalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'approved'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/farmers/pending', [FarmerApprovalController::class, 'index'])
        ->name('admin.farmers.pending');

    Route::post('admin/farmers/approve-all', [FarmerApprovalController::class, 'approveAll'])
        ->name('admin.farmers.approveAll');

    Route::post('admin/farmers/{id}/approve', [FarmerApprovalController::class, 'approve'])
        ->name('admin.farmers.approve');
});

require __DIR__.'/auth.php';
