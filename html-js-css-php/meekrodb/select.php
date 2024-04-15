<?php 

require 'connection.php';


// query com string basica


// query com array 
$buscar = array(
    'quantidade' => 60,
    'first_row' => 100  
);

$quantidade = DB::query('SELECT * from quantidade where quantidade <=  "%i_quantidade" ', $buscar);

// print_r($quantidade);
foreach($quantidade as $quantidade_value){
    echo 'ID: ' . $quantidade_value['id'] . ' ---- Quantidade:' . $quantidade_value['quantidade'] . PHP_EOL;
}

$one_row = DB::queryFirstRow('SELECT * from quantidade where quantidade <= %i_first_row', $buscar);
print_r($one_row);
echo PHP_EOL;


$first_field = DB::queryFirstField('SELECT quantidade from quantidade order by id desc');

echo 'Quantidade do Ultimo ID: ' . $first_field  . PHP_EOL;

list($id, $quantidade) = DB::queryFirstList('select id, quantidade from quantidade order by id desc');

$quantidades = DB::queryFirstColumn('SELECT quantidade from quantidade');
print_r($quantidades);


$full_columns = DB::queryFullColumns('SELECT * from users');
print_r($full_columns);


$Walk = DB::queryWalk("SELECT * FROM users");
while ($row = $Walk->next()) {
    print_r($row); // assoc array for one row
}