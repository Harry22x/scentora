<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PerfumeController; 
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Perfume;
use App\Http\Controllers\OrderController;

// 1. PUBLIC ROUTE: The Homepage
// This points the '/' URL to the PerfumeController's index method
Route::get('/', [PerfumeController::class, 'index'])->name('home');


// 2. PROTECTED ROUTES: Only for logged-in users
Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/dashboard', [PerfumeController::class, 'dashboard'])
    ->middleware(['auth'])
    ->name('dashboard');
 Route::get('/my-orders', [OrderController::class, 'index'])->name('orders.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/cart/add/{id}', [CartController::class, 'add'])->name('cart.add');
Route::get('/cart', [CartController::class, 'show'])->name('cart.show');
Route::post('/cart/update/{id}/{action}', [CartController::class, 'update'])->name('cart.update');
Route::post('/checkout', [CartController::class, 'checkout'])->middleware('auth')->name('cart.checkout');
    
    //This contains all of the CRUD functionalities for the perfume table
    Route::resource('perfumes', PerfumeController::class)->except(['index']);
});


require __DIR__.'/auth.php';