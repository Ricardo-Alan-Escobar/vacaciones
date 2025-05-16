<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmpleadoController;

// Ruta pública
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas protegidas por autenticación y verificación
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [EmpleadoController::class, 'index'])->name('dashboard');
    Route::post('/empleados', [EmpleadoController::class, 'store'])->name('empleados.store');
    Route::put('/empleados/{empleado}', [EmpleadoController::class, 'update'])->name('empleados.update');
    Route::delete('/empleados/{empleado}', [EmpleadoController::class, 'destroy'])->name('empleados.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('vacaciones', function () {
        return Inertia::render('vacaciones');
    })->name('vacaciones');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
