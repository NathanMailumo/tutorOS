<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function sessionIndex(){
        return Inertia::render('Sessions/SessionIndex');
    }
}
