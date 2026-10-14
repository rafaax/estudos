<?php 

require 'vendor/autoload.php';

class Connection {

    private $user =  'root' ;
    private $pass = '';
    private $dsn = "mysql:host=localhost;dbname=totp;charset=utf8";

    public function connection(){
        DB::$user = $this->user;
        DB::$password = $this->pass;
        DB::$dsn = $this->dsn;
    }
}


$conn = new Connection();
$conn->connection();