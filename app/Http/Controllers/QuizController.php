<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function quizIndex(){
        return Inertia::render('Quiz/quizIndex');
    }
}
