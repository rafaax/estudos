<?php 

require 'connection.php';


// query com string basica
$users = DB::query("SELECT * from users where nome = %s ", 'raphael' );

$array_users = [];
foreach($users as $user){
    $array_users[] = $user['nome'];
}
echo json_encode($array_users) . '<br>';

// query com array 
$buscar = array(
    'quantidade' => 60,
    'first_row' => 100  
);
$quantidade = DB::query('SELECT * from quantidade where quantidade <=  "%i_quantidade" ', $buscar);

// print_r($quantidade);
foreach($quantidade as $quantidade_value){
    echo 'ID: ' . $quantidade_value['id'] . ' ---- Quantidade:' . $quantidade_value['quantidade'] . '<br>';
}

$one_row = DB::queryFirstRow('SELECT * from quantidade where quantidade <= %i_first_row', $buscar);
print_r($one_row);