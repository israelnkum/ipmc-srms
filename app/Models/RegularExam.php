<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class RegularExam extends Model
{
    use HasFactory;

    protected $fillable = [
        'ongoing_program_id',
        'program_module_id',
    ];

    public function exam(): MorphOne
    {
        return $this->morphOne(Exam::class,'examable');
    }
}