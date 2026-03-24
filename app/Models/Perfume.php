<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perfume extends Model
{
   protected $fillable = ['name', 'category', 'description', 'price', 'stock','imageUrl'];
}
