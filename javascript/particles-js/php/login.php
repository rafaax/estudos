<?php
session_start();

$conexao = mysqli_connect('localhost', 'root', '', 'particles');
$mysqli = new mysqli('localhost','root','', 'particles');


$emailUsuario = trim($_POST['usuario']);
$senhaDigitada = trim($_POST['senha']);

$sql = "SELECT id,email, senha, id FROM usuario WHERE email = '$emailUsuario' OR login = '$emailUsuario'  AND status = 'Ativo'";

$retornoEmailUsuario = mysqli_query($conexao,$sql);
$totalRetornado = mysqli_num_rows($retornoEmailUsuario);

if($totalRetornado == 0){
    header("Location: index.php?semCadastro=".$emailUsuario); 
}
if($totalRetornado >= 2){
    header("Location: index.php?emailCadastrado=".$emailUsuario); 
}
if($totalRetornado == 1){
    while($array = mysqli_fetch_array($retornoEmailUsuario,MYSQLI_ASSOC)){
        $senhaCadastrada = $array['senha'];
        if($senhaDigitada == $senhaCadastrada){
            $_SESSION['usuario'] = $array["id"];
            header("Location: home.php"); 
        } else{
            header("Location: index.php?dadosInvalidos="); 
        }
    }
}

?>