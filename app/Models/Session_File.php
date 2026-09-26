<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session_File extends Model
{
    protected $table = 'session_files';

    protected $fillable = [
        'session_id',
        'reference',
        'metadata',
        'extraction_status'
    ];
}
