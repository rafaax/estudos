<?php 

/*  linkedin: https://www.linkedin.com/in/raphael-meireles-0482b522a/
    github: https://github.com/rafaax
    :) 
*/ 

// gera as chaves
$secret_key = openssl_random_pseudo_bytes(32); ## chave secreta 
$vi = openssl_random_pseudo_bytes(16); ## vetor de inicializacao

// escreve as variaveis em arquivos txt para serem carregadas no index para fazer a descriptografia
file_put_contents('chave_aes.txt', $secret_key); 
file_put_contents('vetor.txt', $vi);

// parametros para passar via get
$params = array(
    'param1' => 'DWBDEjmGG', 
    'param2' => 'gKndZaSxe',
    'param3' => 'kZmHwSfHk'
);


// faz a criptografia
foreach ($params as $secret_key => $value) {
    $params[$secret_key] = openssl_encrypt($value, 'AES-128-CBC', $secret_key, 0, $vi);
}

// print_r($params);

$query = http_build_query($params);
