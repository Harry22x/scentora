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
        Schema::create('perfumes', function (Blueprint $table) {
           $table->id();
        $table->string('name');           // e.g., "Sauvage"
        $table->string('category'); 
        $table->string('imageUrl');           // e.g., "Dior"
        $table->text('description')->nullable(); 
        $table->decimal('price', 8, 2);   // 8 digits total, 2 after decimal
        $table->integer('stock')->default(10);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfumes');
    }
};
