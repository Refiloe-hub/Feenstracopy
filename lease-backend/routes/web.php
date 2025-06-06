<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeeswaxController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/verify-id', [BeeswaxController::class, 'verifyId']);