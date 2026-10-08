<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ClerkSyncController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'clerk_id'          => 'required|string',
            'email'             => 'required|email',
            'name'              => 'nullable|string',
            'profile_image_url' => 'nullable|string',
        ]);

        // Find existing user or create a new one
        $user = User::where('clerk_id', $validated['clerk_id'])
            ->orWhere('email', $validated['email'])
            ->first();

        if (!$user) {
            $user = User::create([
                'clerk_id'          => $validated['clerk_id'],
                'name'              => $validated['name'] ?? explode('@', $validated['email'])[0],
                'email'             => $validated['email'],
                'profile_image_url' => $validated['profile_image_url'] ?? null,
                'password'          => bcrypt(Str::random(16)),
            ]);
        } else {
            $user->update([
                'clerk_id'          => $validated['clerk_id'],
                'profile_image_url' => $validated['profile_image_url'] ?? $user->profile_image_url,
            ]);
        }

        // 1. Authenticate user into local Laravel web guard
        // The users table does not use persistent "remember me" sessions.
        Auth::login($user);

        // 2. CRITICAL: Regenerate session to write cookie headers for Inertia
        $request->session()->regenerate();

        // 3. Return Inertia-compatible redirect to dashboard
        return redirect()->route('dashboard');
    }
}
