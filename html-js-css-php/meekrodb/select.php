<?php 

require 'connection.php';





$full_columns = DB::queryFullColumns('SELECT * from users');
print_r($full_columns);


$Walk = DB::queryWalk("SELECT * FROM users");
while ($row = $Walk->next()) {
    print_r($row); // assoc array for one row
}