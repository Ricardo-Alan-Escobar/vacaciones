<?php

namespace App\Http\Controllers;

use App\Models\Permiso;
use App\Models\Empleado;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\NuevaSolicitudVacaciones;

class PermisosController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $empleado = Empleado::where('user_id', $user->id)->first();
        
        $permisos = [];
        if ($empleado) {
            $permisos = Permiso::where('empleado_id', $empleado->id)->get();
        }

        return inertia('Permisos', [
            'empleado' => $empleado,
            'permisos' => $permisos,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'empleado_id'   => 'required|exists:empleados,id',
            'motivo'        => 'required|string|max:255',
            'fecha_inicio'  => 'required|date',
            'fecha_fin'     => 'nullable|date|after_or_equal:fecha_inicio',
            'horas'         => 'nullable|integer|min:1',
            'observaciones' => 'nullable|string|max:1000',
        ]);

        Permiso::create([
            'empleado_id'   => $validated['empleado_id'],
            'motivo'        => $validated['motivo'],
            'fecha_inicio'  => $validated['fecha_inicio'],
            'fecha_fin'     => $validated['fecha_fin'] ?? $validated['fecha_inicio'],
            'horas'         => $validated['horas'],
            'estado'        => 'pendiente',
            'observaciones' => $validated['observaciones'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Solicitud de permiso registrada.');
    }

    public function updateEstado(Request $request, Permiso $permiso)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,aprobado,rechazado',
        ]);

        $permiso->update([
            'estado' => $request->estado,
        ]);

        return redirect()->back()->with('message', 'Permiso actualizado correctamente.');
    }
}
