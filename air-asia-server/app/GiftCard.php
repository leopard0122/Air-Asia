<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GiftCard extends Model
{
    //
    protected $fillable = ['cardName', 'cardType', 'cardValue', 'points', 'cardImageUrl'];
}
