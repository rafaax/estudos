<?php 
/*  linkedin: https://www.linkedin.com/in/raphael-meireles-0482b522a/
    github: https://github.com/rafaax
    :) 
*/ 
if ($_SERVER['REQUEST_METHOD'] === 'GET') { // valida se a requisicao é get

    // recupera os parametros e atribui-os à variáveis
    $param1 = $_GET['param1'];
    $param2 = $_GET['param2'];
    $param3 = $_GET['param3'];
    $type  = $_GET['type'];
}
