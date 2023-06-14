<?php
session_start();

$conexao = mysqli_connect('localhost', 'root', '', 'particles');
$mysqli = new mysqli('localhost','root','', 'particles');


$emailUsuario = trim($_POST['usuario']);
$senhaDigitada = trim($_POST['senha']);

$sql = "SELECT id,email, senha, id FROM usuario WHERE email = '$emailUsuario' OR login = '$emailUsuario'  AND status = 'Ativo'";

$retornoEmailUsuario = mysqli_query($conexao,$sql);
$totalRetornado = mysqli_num_rows($retornoEmailUsuario);
