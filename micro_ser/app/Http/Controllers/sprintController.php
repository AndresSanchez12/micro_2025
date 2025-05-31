<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sprint;
use Illuminate\Support\Facades\Validator;

class SprintController extends Controller
{
    public function index(){
        $sprints = Sprint::all();

        if($sprints->isEmpty()){
            return response()->json(['message' => 'No hay sprints registrados'], 200);
        }

        return response()->json($sprints, 200);


    }


    public function show($id){
        $sprints = Sprint::find($id);
        if (!$sprints) {
            $data = [
                'message' => 'No se encontró el sprint con el id: ' . $id,
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'sprint' => $sprints,
            'status' => 200

        ];
        return response()->json($data, 200);

    }


    public function store(Request $request) {

        $request->validate([
            'nombre' => 'required|string|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio'
        ]);

        $sprint = Sprint::create($request->all());

        return response()->json([
            'message' => 'Sprint creado correctamente',
            'sprint' => $sprint
        ], 201);
    }


    public function update(Request $request, $id){
        
        $sprint = Sprint::find($id);

        if (!$sprint) {
            $data = [
                'message' =>'No se encontró el sprint con el id: ' . $id,
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(),[
            'nombre' => 'required|string|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' =>'Error de validación de datos ',
                'errors' => $validator->errors(),
                'status' => 404
            ];
            return response()->json($data, 400);
        }

        $sprint-> nombre = $request->nombre;
        $sprint-> fecha_inicio = $request-> fecha_inicio;
        $sprint-> fecha_fin = $request-> fecha_fin;
        $sprint-> save();

        $data = [
            'message' =>'Sprint actualizado ' ,
            'status' => 200
        ];
        return response()->json($data, 200);


    }


    public function destroy($id){
        $sprints = Sprint::find($id);

        if (!$sprints) {
            $data = [
                'message' => 'No se encontró el sprint con el id: ' . $id,
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $sprints->delete();

        $data = [
            'message' => 'Sprint eliminado ',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
