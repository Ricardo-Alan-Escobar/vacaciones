<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacacion extends Model
{
    protected $table = 'vacaciones'; // <- Esto soluciona el error

    protected $fillable = [
        'empleado_id', 'motivo', 'fecha_inicio', 'fecha_fin', 'dias', 'estado'
    ];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }
}
