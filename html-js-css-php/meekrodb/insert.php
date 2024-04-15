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
    // mysqli_last_inserted_id
    DB::insert('quantidade', array(
        'quantidade' => readline("Digite uma quantidade para inserir no db: ")
    ));

    echo 'Inserted ID: '.  DB::insertId();
}


// main
print('Estudo de MeekroDB - RAPHAEL G. MEIRELES') . PHP_EOL;
print('Escolha uma função para executar e visualizar os resultados:') . PHP_EOL;
print('Função 1 -> Faz o insert e retorna se a função foi um sucesso ou não.') . PHP_EOL;
print('Função 2 -> Faz o insert de um array de dados e retorna se foi sucesso ou não.') . PHP_EOL;

insert4();


?>