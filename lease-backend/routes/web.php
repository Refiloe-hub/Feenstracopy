<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeeswaxController;

Route::get('/', function () {
    return view('welcome');
});

// Route to handle ID verification upload from frontend
Route::post('/verify-id', [BeeswaxController::class, 'verifyId']); 
