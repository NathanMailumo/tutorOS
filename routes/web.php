<?php

use App\Http\Controllers\SessionController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard'])
        ->middleware('verified')
        ->name('dashboard');

        // Sessions Routes
    Route::get('/sessions', [SessionController::class, 'sessionIndex'])
        ->middleware('verified')
        ->name('sessions.index');


        // Resources Routes
    Route::get('/resources', [ResourceController::class, 'resourceIndex'])
        ->middleware('verified')
        ->name('resources.index');
    Route::post('/resources', [ResourceController::class, 'createResource'])
        ->middleware('verified')
        ->name('resources.store');
    Route::get('/resources/private/{resource}', [ResourceController::class, 'privateResource'])
        ->middleware('verified')
        ->name('resources.private');
    Route::get('/resources/public/{resource}', [ResourceController::class, 'publicResource'])
        ->middleware('verified')
        ->name('resources.public');
    Route::get('/resources/{resource}', [ResourceController::class, 'showResource'])
        ->middleware('verified')
        ->name('resources.show');
});

require __DIR__.'/auth.php';
