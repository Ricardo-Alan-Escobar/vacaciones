<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\VacacionesController;
use App\Http\Controllers\NotificacionController;

// Ruta pública
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas protegidas por autenticación y verificación
Route::middleware(['auth', 'verified'])->group(function () { 

    Route::middleware(['admin'])->group(function () {
        Route::get('/dashboard', [EmpleadoController::class, 'index'])->name('dashboard');

        // CRUD empleados también solo para admin
        Route::post('/empleados', [EmpleadoController::class, 'store'])->name('empleados.store');
        Route::put('/empleados/{empleado}', [EmpleadoController::class, 'update'])->name('empleados.update');
        Route::delete('/empleados/{empleado}', [EmpleadoController::class, 'destroy'])->name('empleados.destroy');
        Route::get('/empleados', [EmpleadoController::class, 'index']);

    });

    // Vista de vacaciones (usa el controlador correcto)
    Route::get('/vacaciones', [VacacionesController::class, 'index'])->name('vacaciones');
    Route::post('/vacaciones', [VacacionesController::class, 'store'])->name('vacaciones.store');


    // API para obtener datos de vacaciones por ID de usuario
    Route::get('/api/empleados/{userId}/vacaciones', [VacacionesController::class, 'getVacationData']);


     Route::put('/solicitudes/{vacacion}/estado', [VacacionesController::class, 'updateEstado'])
        ->name('admin.solicitudes.updateEstado');

    // API para obtener datos de vacaciones por ID de usuario
    Route::get('/api/empleados/{userId}/vacaciones', [VacacionesController::class, 'getVacationData']);



    // ruta para la vista de notificaciones
    Route::get('/notificaciones', [NotificacionController::class, 'index'])->name('notificaciones');
    Route::post('/notificaciones/{id}/leer', [NotificacionController::class, 'marcarComoLeida']);
Route::delete('/notificaciones/{id}', [NotificacionController::class, 'eliminar']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
