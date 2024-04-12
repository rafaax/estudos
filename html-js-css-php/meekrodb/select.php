<?php 

require 'connection.php';

$users = DB::query("SELECT * from users where nome = %s ", 'raphael' );

foreach($users as $user){
    echo $user['nome'];
}
