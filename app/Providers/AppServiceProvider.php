<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminOnly;
use Illuminate\Support\Facades\Auth;


class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        \Illuminate\Support\Facades\Route::aliasMiddleware('admin', \App\Http\Middleware\AdminOnly::class);

    
    Inertia::share([
        'auth.user' => fn () => Auth::user() ? [
            'id' => Auth::id(),
            'name' => Auth::user()->name,
            'rol' => Auth::user()->rol, // <== aquí pasas el rol
            'email' => Auth::user()->email,
        ] : null,
    ]);
        // Registrar el alias del middleware aquí
        Route::aliasMiddleware('admin', AdminOnly::class);
    }
}
