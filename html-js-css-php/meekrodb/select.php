<?php 

require 'connection.php';





list($id, $quantidade) = DB::queryFirstList('select id, quantidade from quantidade order by id desc');

$quantidades = DB::queryFirstColumn('SELECT quantidade from quantidade');
print_r($quantidades);


$full_columns = DB::queryFullColumns('SELECT * from users');
print_r($full_columns);


$Walk = DB::queryWalk("SELECT * FROM users");
while ($row = $Walk->next()) {
    print_r($row); // assoc array for one row
}