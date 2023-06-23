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

    
    // valida o tipo
    if($type == 'base64'){

        $response = array(
            'param1' => $param1,
            'param2' => $param2, 
            'param3' => $param3
        );

        // builda a query
        $queryString = http_build_query($response);
        
        // cria o array decodedParams
        $decodedParams = array();
        // separa o array em variáveis
        parse_str($queryString, $decodedParams);

        // decriptografa as variáveis
        foreach ($decodedParams as $key => $value) {
            $decodedParams[$key] = base64_decode($value);
        }   

        // separa em 3 variáveis
        $decodedparam = $decodedParams['param1']; 
        $decodedparam2 = $decodedParams['param2']; 
        $decodedparam3 = $decodedParams['param3']; 

        // escreve a resposta em um txt
        file_put_contents('response_base64.txt', $decodedparam . PHP_EOL . $decodedparam2 . PHP_EOL . $decodedparam3);
    }
}
