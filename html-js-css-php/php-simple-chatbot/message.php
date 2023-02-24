<?php
$conexao = mysqli_connect("localhost", "rapha", "admin", "chatbot");
$mysqli = new mysqli("localhost","rapha","admin","chatbot");

$pergunta = mysqli_real_escape_string($conexao, $_POST['texto']);
$perguntalowercase = mb_strtolower($pergunta,'UTF-8');
?>
