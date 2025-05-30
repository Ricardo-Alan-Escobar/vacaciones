<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacacion extends Model
{
    protected $table = 'vacaciones'; 

    protected $fillable = [
        'empleado_id', 'motivo', 'fecha_inicio', 'fecha_fin', 'dias', 'estado', 'observaciones',
    ];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }
}
