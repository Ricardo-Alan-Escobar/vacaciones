<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Vacacion;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Notifications\NuevaSolicitudVacaciones;
use App\Notifications\SolicitudAprobada;
use App\Notifications\SolicitudRechazada;


class VacacionesController extends Controller
{
    public function index()
{
    $user = Auth::user();
    $empleado = Empleado::where('user_id', $user->id)->first();
    
    $diasUsados = 0;
    $vacaciones = [];

    if ($empleado) {
        $vacaciones = Vacacion::where('empleado_id', $empleado->id)->get();

        $diasUsados = $vacaciones->where('estado', 'aprobado')->sum('dias');
        
        $empleado->dias_usados = $diasUsados;
    }

    return inertia('vacaciones', [
        'empleado' => $empleado,
        'vacaciones' => $vacaciones,
    ]);
}
public function store(Request $request)
{
    // Validar datos
    $validated = $request->validate([
        'empleado_id'   => 'required|exists:empleados,id',
        'motivo'        => 'required|string|max:255',
        'fecha_inicio'  => 'required|date',
        'fecha_fin'     => 'required|date|after_or_equal:fecha_inicio',
        'dias'          => 'required|integer|min:1',
    ]);
  
    Vacacion::create([
        'empleado_id'  => $validated['empleado_id'],
        'motivo'       => $validated['motivo'],
        'fecha_inicio' => $validated['fecha_inicio'],
        'fecha_fin'    => $validated['fecha_fin'],
        'dias'         => $validated['dias'],
        'estado'       => 'pendiente',
    ]);

     $empleado = Empleado::find($validated['empleado_id']);
    $admins = User::where('rol', 'admin')->get();

    foreach ($admins as $admin) {
        $admin->notify(new NuevaSolicitudVacaciones($empleado));
    }
    return redirect()->back()->with('success', 'Solicitud de vacaciones registrada.');
}
public function allRequests()
{
    $vacaciones = Vacacion::with('empleado.user')->get();

    return inertia('SolicitudesGlobales', [
        'vacaciones' => $vacaciones,
    ]);
}

public function updateEstado(Request $request, Vacacion $vacacion)
{
    $request->validate([
        'estado' => 'required|in:pendiente,aprobado,rechazado',
    ]);

    // Si el estado está cambiando
    if ($vacacion->estado !== $request->estado) {
        $empleado = Empleado::find($vacacion->empleado_id);

        if ($request->estado === 'aprobado') {
            // Solo descontar si no se ha aprobado antes
            if ($vacacion->estado !== 'aprobado') {
                $empleado->dias_vacaciones -= $vacacion->dias;
                $empleado->save();
            }
        }

        // Si se cambia de aprobado a rechazado, devolver los días
        if ($vacacion->estado === 'aprobado' && $request->estado === 'rechazado') {
            $empleado->dias_vacaciones += $vacacion->dias;
            $empleado->save();
        }
    }

    $vacacion->update([
        'estado' => $request->estado,
    ]);

    $empleado = Empleado::find($vacacion->empleado_id);
$user = $empleado->user;

if ($request->estado === 'aprobado') {
    $user->notify(new SolicitudAprobada());
} elseif ($request->estado === 'rechazado') {
    $user->notify(new SolicitudRechazada());
}

    return redirect()->back()->with('message', 'Solicitud actualizada correctamente.');
}


}