<?php

// app/Http/Controllers/DatabaseTestController.php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DatabaseTestController extends Controller
{
    public function testConnection()
    {
        try {
            // Attempt a simple database query (e.g., select 1) to check the connection.
            $result = DB::select('select 1');

            // If the query runs without errors, the connection is successful.
            return 'Database connection is successful!';
        } catch (\Exception $e) {
            // If there's an exception, the connection has failed.
            return 'Database connection failed: ' . $e->getMessage();
        }
    }
}

