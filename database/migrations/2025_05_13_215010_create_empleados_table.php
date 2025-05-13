<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
    $table->id();
    $table->string('nombre');
    $table->string('puesto')->nullable();
    $table->date('fecha_ingreso')->nullable();
    $table->string('correo')->unique();
    $table->boolean('tiene_vacaciones')->default(false);
    $table->integer('dias_vacaciones')->default(0);
    $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
