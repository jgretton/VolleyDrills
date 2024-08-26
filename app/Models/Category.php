<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    // Define the inverse relationship with the Drill model
    public function drills()
    {
        return $this->hasMany(Drill::class);
    }
}
