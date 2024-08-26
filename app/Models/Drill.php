<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drill extends Model
{
    use HasFactory;
    
    protected $fillable = ['title', 'description', 'category_id', 'objectives', 'small_description','equipment', 'duration','difficulty'];
    
    protected $casts = [
        'objectives' => 'array',
        'equipment' =>'array'
    ];

    // Define the relationship with the Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
