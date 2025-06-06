<?php

namespace App\Http\Controllers;

abstract class Controller
{
       public function verifyId(Request $request)
    {
        // === MOCKING MODE: skip file check and return dummy response ===
        if ($request->input('mock') === 'true') {
            return response()->json([
                'uniqueId' => '0',
                'firstName' => 'Thapelo',
                'surname' => 'Radebe',
                'identityNumber' => '8802155321087',
                'passport' => null,
                'status' => 'Verified'
            ]);
        }

        // === REAL MODE: validate uploaded file and send to Beeswax ===
        if (!$request->hasFile('id_document')) {
            return response()->json(['error' => 'No file uploaded'], 400);
        }

        $file = $request->file('id_document');

        $response = Http::withToken(env('BEESWAX_API_KEY'))
            ->attach('id_document', file_get_contents($file), $file->getClientOriginalName())
            ->post('https://publicapi.honeycombonline.co.za/natural-person-address');

        if ($response->failed()) {
            return response()->json([
                'error' => 'Verification failed',
                'details' => $response->json()
            ], $response->status());
        }

        return response()->json($response->json());
    }
}
