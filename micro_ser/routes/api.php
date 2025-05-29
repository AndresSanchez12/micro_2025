<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\historiaController;
use App\Http\Controllers\sprintController;

//HISTORIA
Route::get('/historias', [historiaController::class, 'index']);
Route::get('/historias/{id}', [historiaController::class, 'show']);
Route::post('/historias', [historiaController::class, 'store']);
Route::put('/historias/{id}', [historiaController::class, 'update']);
Route::delete('/historias/{id}', [historiaController::class, 'destroy']);


//SPRINT
Route::get('/sprints', [sprintController::class, 'index']);
Route::get('/sprints/{id}', [sprintController::class, 'show']);
Route::post('/sprints', [sprintController::class, 'store']);
Route::put('/sprints/{id}', [sprintController::class, 'update']);
Route::delete('/sprints/{id}', [sprintController::class, 'destroy']);