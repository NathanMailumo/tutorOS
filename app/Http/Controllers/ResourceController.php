<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function resourceIndex(){
        return Inertia::render('Resources/resourcesIndex');
    }
}
