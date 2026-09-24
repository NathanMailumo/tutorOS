<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResourceUserController extends Controller
{
    /**
     * Display the list of invited collaborators (Invited.jsx).
     */
    public function members(Resource $resource)
    {
        $userId = Auth::id();
        $isOwner = $resource->user_id === $userId;

        // Fetch collaborators from pivot table
        $collaborators = $resource->collaborators()
            ->get(['users.id', 'users.name', 'users.email']);

        return Inertia::render('Resources/invited', [
            'resource'      => $resource,
            'collaborators' => $collaborators,
            'canInvite'     => $isOwner,
        ]);
    }

    /**
     * Process an invite sent to a user.
     */
    public function invite(Request $request, Resource $resource)
    {
        if ($resource->user_id !== Auth::id()) {
            abort(403, 'Only the owner can invite collaborators.');
        }

        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        $userToInvite = User::where('email', $request->email)->first();

        if ($userToInvite->id === Auth::id()) {
            return redirect()->back()->withErrors(['email' => 'You are already the owner of this workspace.']);
        }

        $resource->collaborators()->syncWithoutDetaching([
            $userToInvite->id => ['status' => 'pending'],
        ]);

        return redirect()->back()->with('success', 'User invited successfully.');
    }

    /**
     * Remove a collaborator from the workspace pivot table.
     */
    public function removeCollaborator(Resource $resource, User $user)
    {
        if ($resource->user_id !== Auth::id()) {
            abort(403, 'Only the owner can remove collaborators.');
        }

        $resource->collaborators()->detach($user->id);

        return redirect()->back()->with('success', 'Collaborator removed.');
    }
}
