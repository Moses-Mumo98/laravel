<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PostsController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('/login', function () {
    return view('login');
});
Route::get('/bookings', function () {
    return view('bookings');
});

Route::get('/dbconn', function () {
    return view('dbconn');
});



Auth::routes(['login' => false]);
Route::get('/test-database-connection', 'DatabaseTestController@testConnection');

Route::get('/posts', [PostsController::class,'api']);

?>
