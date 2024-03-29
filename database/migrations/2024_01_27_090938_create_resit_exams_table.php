<?php

use App\Models\OngoingProgram;
use App\Models\ProgramModule;
use App\Models\Student;
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
        Schema::create('resit_exams', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(Student::class);
            $table->foreignIdFor(ProgramModule::class);
            $table->foreignIdFor(OngoingProgram::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resit_exams');
    }
};
