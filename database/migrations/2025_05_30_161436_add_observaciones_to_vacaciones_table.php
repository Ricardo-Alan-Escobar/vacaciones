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
    Schema::table('vacaciones', function (Blueprint $table) {
        $table->text('observaciones')->nullable()->after('estado');
    });
}

    /**
     * Reverse the migrations.
     */
   public function down()
{
    Schema::table('vacaciones', function (Blueprint $table) {
        $table->dropColumn('observaciones');
    });
}
};
