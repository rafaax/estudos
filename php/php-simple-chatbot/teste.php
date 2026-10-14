<?php 

$frase = "    Frase com espaço no começo e final.    ";

var_dump($frase);
echo '<br>';
$fraseSemEspaco = str_replace(' ', '', $frase);
var_dump($fraseSemEspaco); 
