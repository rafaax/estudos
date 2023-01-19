<?php
// including connect.php 
include_once 'connect.php';
// including head from index
echo '<html lang="pt-br">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="bootstrap/bootstrap.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>';


if(isset($_POST["query"]))
{
    // $search receive the input text from index.php 
	$search = mysqli_real_escape_string($connect, $_POST["query"]);
	$query = 
    "SELECT * FROM estoque 
	WHERE Categoria LIKE '%".$search."%'
	OR Nome LIKE '%".$search."%'";

}
else
{
    // query for show data if the user dont search anything
	$query = "SELECT * FROM estoque ORDER BY DataCompra desc";
}
?>
