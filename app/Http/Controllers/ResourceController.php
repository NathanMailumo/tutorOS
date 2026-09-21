<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Resource;

class ResourceController extends Controller
{
    public function resourceIndex(){
        return Inertia::render('Resources/resourcesIndex');
    }

    public function createResource(Request $request){

        $validated = $request->validate([
            'course_name' => 'required|string|max:255',
            'resource_type' => 'required|in:private,public',
        ]);

        $validated['user_id'] = $request->user()->id;

        Resource::create($validated);

        return redirect()->back();
    }
}
