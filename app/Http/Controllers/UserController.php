<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Resource;

class UserController extends Controller
{
    public function dashboard(Request $request){
       $resources = Resource::where('user_id', $request->user()->id)
                    ->get();

        return Inertia::render('Dashboard', compact('resources'));
    }
}
