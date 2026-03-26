<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PerfumeController; // Keep this at the top
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Perfume;

// 1. PUBLIC ROUTE: The Homepage
// This points the '/' URL to your PerfumeController's index method
Route::get('/', [PerfumeController::class, 'index'])->name('home');

// 2. PROTECTED ROUTES: Only for logged-in users
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'perfumes' => Perfume::all(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // If you want to keep the other CRUD actions (create, edit, delete) 
    // protected, put the resource here but exclude 'index'
    Route::resource('perfumes', PerfumeController::class)->except(['index']);
});

require __DIR__.'/auth.php';