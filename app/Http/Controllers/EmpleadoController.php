<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class EmpleadoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'puesto' => 'nullable|string|max:255',
            'fecha_ingreso' => 'nullable|date',
            'correo' => 'required|email|unique:users,email',
        ]);

        $fechaIngreso = $request->fecha_ingreso;
        $tieneVacaciones = false;
        $diasVacaciones = 0;

        if ($fechaIngreso) {
            $fecha = Carbon::parse($fechaIngreso);
            if ($fecha->diffInYears(now()) >= 1) {
                $tieneVacaciones = true;
                $diasVacaciones = 6; // inicial
            }
        }

        $user = User::create([
            'name' => $request->nombre,
            'email' => $request->correo,
            'password' => Hash::make('Maquirsa217'), // puedes personalizar esto
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
}