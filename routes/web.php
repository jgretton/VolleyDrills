<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DrillController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicDrillController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [PublicDrillController::class, 'index', 
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('/dashboard/drills', DrillController::class)
    ->middleware(['auth', 'verified'])->names([
        'index'=> 'dashboard.drills',
        'show' => 'dashboard.drills.show',
        'create' =>'dashboard.drills.create'
    ]);

    Route::resource('/dashboard/categories', CategoryController::class)
    ->middleware(['auth', 'verified'])->names([
        'index' => 'dashboard.categories',
    ]);


require __DIR__.'/auth.php';
