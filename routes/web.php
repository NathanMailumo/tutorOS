<?php

use App\Http\Controllers\SessionController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\ResourceItemController;
use App\Http\Controllers\ResourceUserController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard'])
        ->name('dashboard');

    // Sessions Routes
    Route::get('/sessions', [SessionController::class, 'sessionIndex'])
        ->middleware('verified')
        ->name('sessions.index');

    // Resource Management (ResourceController)
    Route::get('/resources', [ResourceController::class, 'resourceIndex'])
        ->middleware('verified')
        ->name('resources.index');

    Route::post('/resources', [ResourceController::class, 'createResource'])
        ->middleware('verified')
        ->name('resources.store');

    Route::delete('/resources/{resource}', [ResourceController::class, 'destroy'])
        ->middleware('verified')
        ->name('resources.destroy');

    Route::get('/resources/private/{resource}', [ResourceController::class, 'privateResource'])
        ->middleware('verified')
        ->name('resources.private');

    Route::get('/resources/public/{resource}', [ResourceController::class, 'publicResource'])
        ->middleware('verified')
        ->name('resources.public');

    // Workspace Main View
    Route::get('/resources/{resource}', [ResourceController::class, 'show'])
        ->name('resources.show');

    // Resource Items
    Route::post('/resource-items', [ResourceItemController::class, 'store'])
        ->name('resource-items.store');

    // Collaborators & Members (ResourceUserController)
    Route::get('/resources/{resource}/collaborators', [ResourceUserController::class, 'members'])
        ->name('resources.collaborators.index');

    Route::post('/resources/{resource}/invite', [ResourceUserController::class, 'invite'])
        ->name('resources.invite');

    Route::delete('/resources/{resource}/collaborators/{user}', [ResourceUserController::class, 'removeCollaborator'])
        ->name('resources.collaborators.destroy');
});

require __DIR__ . '/auth.php';
