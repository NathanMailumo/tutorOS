<?php

use App\Http\Controllers\QuizController;
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
    Route::get('/sessions', [SessionController::class, 'sessionIndex'])
        ->middleware('verified')
        ->name('sessions.index');
    Route::get('/quizzes', [QuizController::class, 'quizIndex'])
        ->middleware('verified')
        ->name('quizzes.index');
    Route::get('/resources', [ResourceController::class, 'resourceIndex'])
        ->middleware('verified')
        ->name('resources.index');
});

require __DIR__.'/auth.php';
