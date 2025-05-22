<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificacionController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('notificaciones', [
            'notificaciones' => $user->notifications,
        ]);
    }

    public function marcarComoLeida($id)
    {
        $notificacion = Auth::user()->notifications()->findOrFail($id);
        $notificacion->markAsRead();

        return back(); // o usar return response()->json(['success' => true]);
    }

    public function eliminar($id)
    {
        $notificacion = Auth::user()->notifications()->findOrFail($id);
        $notificacion->delete();

        return back(); // o usar return response()->json(['success' => true]);
    }
}