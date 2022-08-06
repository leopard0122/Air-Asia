<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Redemption extends Model
{
    //
    protected $fillable = ['date', 'accountId', 'cardId', 'pointsRedeemed'];
}
