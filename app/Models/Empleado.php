<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $fillable = [
        'nombre', 'puesto', 'fecha_ingreso', 'correo',
        'tiene_vacaciones', 'dias_vacaciones', 'user_id', 'jefe', 'empresa'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
