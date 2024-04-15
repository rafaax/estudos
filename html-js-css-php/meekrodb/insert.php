<?php 

require 'connection.php';

function insert1(){
    DB::insert('quantidade', ['quantidade' => 99]);
    return DB::affectedRows();
}

function insert2(){
    DB::insert('users', array(
        'nome' => 'guilherme',
        'sobrenome' => 'henrique',
        'endereco' => 'rua professor paulo ferrari massaru',
        'email' => 'gui@gmail.com',
        "telefone" => '1199022022',
        'cpf' => '0951098722'
    ));
    
    return DB::affectedRows();
}

function insert3(){
    $dados_pessoais = [];  
    array_push($dados_pessoais, array(
            'nome' => 'guilherme',
            'sobrenome' => 'henrique',
            'endereco' => 'rua professor paulo ferrari massaru',
            'email' => 'gui@gmail.com',
            'telefone' => '1199022022',
            'cpf' => '0951098722'
        )
    );

    array_push($dados_pessoais, array(
        'nome' => 'raphael', 
        'sobrenome' => 'gustavo', 
        'endereco' => 'rua bla bla bla', 
        'email' => 'papapa@gmail.com',
        'telefone' => '21212345', 
        'cpf' => '203232932'
    ));
    

    foreach($dados_pessoais as $values){
        DB::insert('users', array(
            'nome' => $values['nome'],
            'sobrenome' => $values['sobrenome'], 
            'endereco' => $values['endereco'], 
            'email' => $values['email'],
            'telefone' => $values['telefone'], 
            'cpf' => $values['cpf']
        ));
    }

}


function insert4(){
    DB::insert('quantidade', array(
        'quantidade' => 200
    ));

    echo 'Inserted ID: '.  DB::insertId();
}

insert4();


?>