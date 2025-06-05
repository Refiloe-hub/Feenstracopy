namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BeeswaxController extends Controller
{
    public function verifyId(Request $request)
    {
        if (!$request->hasFile('id_document')) {
            return response()->json(['error' => 'No file uploaded'], 400);
        }

        $file = $request->file('id_document');

        $response = Http::withToken(env('BEESWAX_API_KEY'))
            ->attach('id_document', file_get_contents($file), $file->getClientOriginalName())
            ->post('https://publicapi.honeycombonline.co.za/natural-person-address');

        if ($response->failed()) {
            return response()->json(['error' => 'Verification failed', 'details' => $response->json()], $response->status());
        }

        return response()->json($response->json());
    }
}
