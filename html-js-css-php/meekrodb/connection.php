<?php 
require 'vendor/autoload.php';


DB::$user = 'root';
DB::$password = '';
DB::$dbName = 'raphael';

$result = DB::query("SELECT * FROM users");
