<?php

use App\Models\User;
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
        Schema::create('drills', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->string('small_description');
            $table->text('description');
            $table->json('equipment')->nullable();
            $table->json('objectives');
            $table->string('difficulty');
            $table->integer('duration');
            $table->foreignIdFor(User::class);
            $table->unsignedBigInteger('category_id')->nullable()->after('description'); // Adjust position as needed

            // Set up foreign key constraint
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drills');
        
    }
};
