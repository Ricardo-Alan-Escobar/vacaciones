<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('vacaciones', function (Blueprint $table) {
        $table->id();
        $table->foreignId('empleado_id')->constrained()->onDelete('cascade');
        $table->string('motivo');
        $table->date('fecha_inicio');
        $table->date('fecha_fin');
        $table->integer('dias');
        $table->enum('estado', ['pendiente', 'aprobado', 'rechazado'])->default('pendiente');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacaciones');
    }
};
