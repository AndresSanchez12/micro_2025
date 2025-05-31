<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Historia;
use Illuminate\Support\Facades\Validator;


class HistoriaController extends Controller
{
    public function index(){

        $historias = Historia::all();

        if($historias->isEmpty()){
            return response()->json(['message' => 'No hay historias registradas'], 200);
        }

        return response()->json($historias, 200);


    }


    public function show($id){
        $historia = Historia::find($id);
        if (!$historia) {
            $data = [
                'message' => 'No se encontró la historia con el id: ' . $id,
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'historia' => $historia,
            'status' => 200

        ];
        return response()->json($data, 200);

    }


    public function store(Request $request){
    
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'responsable' => 'required|string',
            'estado' => 'required|in:nueva,activa,finalizada,impedimento',
            'puntos' => 'required|integer',
            'fecha_creacion' => 'required|date',
            'fecha_finalizacion' => 'required|date',
            'sprint_id' => 'required|exists:sprints,id'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error al validar la historia',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }
    
        $historia = Historia::create($request->all());
    
        if (!$historia) {
            return response()->json([
                'message' => 'Error al crear la historia',
                'status' => 500
            ], 500);
        }
    
        return response()->json([
            'message' => 'Historia creada exitosamente',
            'historia' => $historia,
            'status' => 201
        ], 201);
    }
    

    public function update(Request $request, $id){
        
        $historia = Historia::find($id);

        if (!$historia) {
            $data = [
                'message' =>'No se encontró la historia con el id: ' . $id,
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'responsable' => 'required|string',
            'estado' => 'required|in:nueva,activa,finalizada,impedimento',
            'puntos' => 'required|integer',
            'fecha_creacion' => 'required|date',
            'fecha_finalizacion' => 'required|date',
            'sprint_id' => 'required|exists:sprints,id'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' =>'Error de validación de datos ',
                'errors' => $validator->errors(),
                'status' => 404
            ];
            return response()->json($data, 400);
        }

        $historia-> titulo = $request->titulo;
        $historia-> descripcion = $request-> descripcion; 
        $historia-> responsable = $request-> responsable;
        $historia-> estado = $request-> estado; 
        $historia-> puntos = $request-> puntos; 
        $historia-> fecha_creacion = $request-> fecha_creacion;
        $historia-> fecha_finalizacion = $request-> fecha_finalizacion;
        $historia-> sprint_id = $request-> sprint_id;
        $historia-> save();
        

        $data = [
            'message' =>'Historia actualizada ' ,
            'status' => 200
        ];
        return response()->json($data, 200);
        
    }


    public function destroy($id){

       $historia = Historia::find($id);

        if (!$historia) {
            $data = [
                'message' => 'No se encontró la historia con el id: ' . $id,
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $historia->delete();

        $data = [
            'message' => 'Historia eliminada ',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
