<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HistoriaController;
use App\Http\Controllers\SprintController;

//HISTORIA
Route::get('/historias', [HistoriaController::class, 'index']);
Route::get('/historias/{id}', [HistoriaController::class, 'show']);
Route::post('/historias', [HistoriaController::class, 'store']);
Route::put('/historias/{id}', [HistoriaController::class, 'update']);
Route::delete('/historias/{id}', [HistoriaController::class, 'destroy']);


//SPRINT
Route::get('/sprints', [SprintController::class, 'index']);
Route::get('/sprints/{id}', [SprintController::class, 'show']);
Route::post('/sprints', [SprintController::class, 'store']);
Route::put('/sprints/{id}', [SprintController::class, 'update']);
Route::delete('/sprints/{id}', [SprintController::class, 'destroy']);