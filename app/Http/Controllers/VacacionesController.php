<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VacacionesController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = Auth::user();
        
        // Get the employee record associated with this user
        $empleado = Empleado::where('user_id', $user->id)->first();
        
        // Calculate used vacation days (this depends on your database structure)
        // This is a placeholder - you need to implement this based on your vacation tracking system
        $diasUsados = 0;
        
        // If you have a vacations table with requests
        // $diasUsados = VacationRequest::where('empleado_id', $empleado->id)
        //                             ->where('estado', 'aprobado')
        //                             ->sum('dias');
        
        // Add the used days to the employee object
        if ($empleado) {
            $empleado->dias_usados = $diasUsados;
        }
        
        return inertia('vacaciones', [
            'empleado' => $empleado
        ]);
    }
}