<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Auth::routes();


Route::post('login', 'API\AuthController@login');
Route::post('register', 'API\AuthController@register');
Route::middleware('auth:api')->get('/profile', function (Request $request) {
    return $request->user();
});



Route::resource('user', 'UserController');
Route::resource('account', 'AccountController');
Route::resource('redemption', 'RedemptionController');
Route::resource('gift-card', 'GiftCardController');

Route::get('accounts', 'AccountController@index');
Route::get('accounts/{account}', 'AccountController@show');
Route::post('accounts', 'AccountController@store');
Route::put('accounts/{account}', 'AccountController@update');
Route::delete('accounts/{account}', 'AccountController@destroy');

Route::get('redemptions', 'RedemptionController@index');
Route::get('redemptions/{redepmtion}', 'RedemptionController@show');
Route::post('redemptions', 'RedemptionController@store');
Route::put('redemptions/{redepmtion}', 'RedemptionController@update');
Route::delete('redemptions/{redepmtion}', 'RedemptionController@destroy');

Route::get('gift-cards', 'GiftCardController@index');   //Get All
Route::get('gift-cards/{giftcard}', 'GiftCardController@show'); // Read One
Route::post('gift-cards', 'GiftCardController@store');           // Create 
Route::put('gift-cards/{giftcard}', 'GiftCardController@update'); // Update
Route::delete('gift-cards/{giftcard}', 'GiftCardController@destroy'); // Delete

