<?php 

require 'connection.php';

function insert1(){
    DB::insert('quantidade', ['quantidade' => 99]);
    echo DB::affectedRows();
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
    
    echo DB::affectedRows();
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

    echo DB::affectedRows();

}


function insert4(){
    // mysqli_last_inserted_id
    DB::insert('quantidade', array(
        'quantidade' => readline("Digite uma quantidade para inserir no db: ")
    ));

    echo 'Inserted ID: '.  DB::insertId();
}

function insert5(){
    DB::insertIgnore('users', array(
        'id' => 1, 
        'nome' => 'Não retornará erro',
    ));
    
    if(DB::affectedRows() == 1){
        echo 'Foi inserido';    
    }else{
        echo 'Nao foi inserido';
    }
    

}


// main
print('Estudo de MeekroDB - RAPHAEL G. MEIRELES') . PHP_EOL;
print('Escolha uma função para executar e visualizar os resultados:') . PHP_EOL . PHP_EOL;
print('Função 1 (insert) -> Faz o insert e retorna se a função foi um sucesso ou não.') . PHP_EOL;
print('Função 2 (insert) -> Faz o insert de um array de dados e retorna se foi sucesso ou não.') . PHP_EOL;
print('Função 3 (insert) -> Define 2 arrays, e insere-os no banco de dados, retornando se foi sucesso ou não.') . PHP_EOL;
print('Função 4 (insert) -> Pede para o usuario digitar uma quantidade e ele usa esse valor para inserir no db, e retorna o valor do inserted id no banco de dados.') . PHP_EOL;
print('Função 5 (insertIgnore) ->  Se o id inserido ja existe, ele nao retorna erro'). PHP_EOL;


print('Escolha uma funcao para executar:');
$escolha = readline();
echo PHP_EOL;

switch($escolha){

    case 1:
        insert1();
        break;
    case 2:
        insert2();
        break;
    case 3:
        insert3();
        break;
    case 4:
        insert4();
        break;
    case 5: 
        insert5();
        break;
    default:
        echo 'Escolha um numero de uma função existente...';
        break;
}




?>