<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class EmpleadoCumpleAnio extends Notification
{
    public $empleado;

     public function __construct($empleado)
    {
        $this->empleado = $empleado;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

   public function toDatabase($notifiable)
    {
        $fecha = \Carbon\Carbon::parse($this->empleado->fecha_ingreso)->addYear();

        return [
            'mensaje' => "El empleado {$this->empleado->nombre} cumplirá un año más el " . $fecha->format('d/m/Y') . ". Asegúrate de actualizar sus días de vacaciones.",
            'empleado_id' => $this->empleado->id, // útil para evitar duplicados
            'url' => '/empleados',
        ];
    }
}