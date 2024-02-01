<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'current_question',
        'student_id',
        'exam_id',
        'program_module_id',
        'total_questions',
        'total_mark',
        'time_left',
        'key_strokes',
        'mark'
    ];

    protected $casts = [
      'key_strokes' => 'array'
    ];
}
