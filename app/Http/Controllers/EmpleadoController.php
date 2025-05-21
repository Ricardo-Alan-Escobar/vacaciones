<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Vacacion;

class EmpleadoController extends Controller
{
    public function index()
{
   $empleados = Empleado::all();
    $vacaciones = Vacacion::with('empleado.user')->get();

    $userId = Auth::id();
    $empleado = Empleado::where('user_id', $userId)->first();
    $diasDisponibles = $empleado?->dias_vacaciones ?? 0;

    return inertia('dashboard', [ 
        'empleados' => $empleados,
        'vacaciones' => $vacaciones,
        'diasDisponibles' => $diasDisponibles,
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'puesto' => 'nullable|string|max:255',
            'fecha_ingreso' => 'nullable|date',
            'correo' => 'required|email|unique:users,email',
            'tiene_vacaciones' => 'nullable|boolean',
            'dias_vacaciones' => 'nullable|integer|min:0',
            'rol' => 'required|string|in:empleado,admin',
        ]);

        // Toma valores directamente del formulario
        $fechaIngreso = $request->fecha_ingreso;
        $tieneVacaciones = $request->has('tiene_vacaciones') ? $request->tiene_vacaciones : false;
        $diasVacaciones = $request->dias_vacaciones ?? 0;

        $user = User::create([
            'name' => $request->nombre,
            'email' => $request->correo,
            'password' => Hash::make('Maquirsa217'), 
            'rol' => 'empleado',
        ]);

        Empleado::create([
            'nombre' => $request->nombre,
            'puesto' => $request->puesto,
            'fecha_ingreso' => $fechaIngreso,
            'correo' => $request->correo,
            'tiene_vacaciones' => $tieneVacaciones,
            'dias_vacaciones' => $diasVacaciones,
            'user_id' => $user->id,
        ]);

        return redirect()->back()->with('success', 'Empleado creado correctamente.');
    }
    public function update(Request $request, Empleado $empleado)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'puesto' => 'nullable|string|max:255',
            'fecha_ingreso' => 'nullable|date',
            'correo' => 'required|email|unique:empleados,correo,' . $empleado->id,
            'tiene_vacaciones' => 'required|boolean',
            'dias_vacaciones' => 'nullable|integer|min:0',
        ]);

        $empleado->update([
            'nombre' => $request->nombre,
            'puesto' => $request->puesto,
            'fecha_ingreso' => $request->fecha_ingreso,
            'correo' => $request->correo,
            'tiene_vacaciones' => $request->tiene_vacaciones,
            'dias_vacaciones' => $request->tiene_vacaciones ? $request->dias_vacaciones : 0,
        ]);

        return redirect()->back()->with('success', 'Empleado actualizado correctamente');
    }

    // Eliminar empleado
  public function destroy(Empleado $empleado)
{
    $empleado->user()->delete(); 
    $empleado->delete();

    return redirect()->back()->with('success', 'Empleado eliminado correctamente');
}


}