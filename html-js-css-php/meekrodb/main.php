<?php 

require 'connection.php';

// main
print('Estudo de MeekroDB - RAPHAEL G. MEIRELES') . PHP_EOL;
print('Escolha uma função para executar e visualizar os resultados:') . PHP_EOL . PHP_EOL;
print('Função 1 (insert) -> Faz o insert e retorna se a função foi um sucesso ou não.') . PHP_EOL;
print('Função 2 (insert) -> Faz o insert de um array de dados e retorna se foi sucesso ou não.') . PHP_EOL;
print('Função 3 (insert) -> Define 2 arrays, e insere-os no banco de dados, retornando se foi sucesso ou não.') . PHP_EOL;
print('Função 4 (insert) -> Pede para o usuario digitar uma quantidade e ele usa esse valor para inserir no db, e retorna o valor do inserted id no banco de dados.') . PHP_EOL;
print('Função 5 (insertIgnore) ->  Se o id inserido ja existe, ele nao retorna erro'). PHP_EOL;
print('Função 6 (insertUpdate) ->  Usando o insertupdate para fazer o update no id 1 ou fazer o insert caso nao exista'). PHP_EOL;
print('Função 7 (insertUpdate) ->  Usando o insertupdate passando apenas um array associativo primário'). PHP_EOL;
print('Função 8 (replace) ->  Usando o replace para substituir os dados do id 5'). PHP_EOL;
print('Função 9 (update) -> Usando a função update'). PHP_EOL;
print('Função 10 (delete) -> Usando a função delete'). PHP_EOL;
print('Função 11 -> Query basica e retornando os dados'). PHP_EOL;
print('Função 12 -> Query basica e retornando os dados parte 2'). PHP_EOL;
print('Função 13 -> Query FirstRow -> Retorna primeiros valores da tabela'). PHP_EOL;
print('Função 14 -> Query FirstField -> Retorna primeiro valor de uma coluna em especifico'). PHP_EOL;
print('Função 15 -> Query FirstList -> Separando os resultados da query em variaveis atraves do list'). PHP_EOL;
print('Função 16 -> Query FirstColumn -> Printando todos os valores de uma coluna '). PHP_EOL;
print('Função 17 -> Query FullColumns -> Printando todos os valores de uma tabela '). PHP_EOL;
print('Função 18 -> Query Walk -> Fazendo a query para printar um por um sem processar todos os dados de uma vez'). PHP_EOL;

echo PHP_EOL;
$escolha = readline('Escolha uma funcao para executar:');


switch($escolha){

    case 1:
        $funcoes->insert1();
        break;
    case 2:
        $funcoes->insert2();
        break;
    case 3:
        $funcoes->insert3();
        break;
    case 4:
        $funcoes->insert4();
        break;
    case 5: 
        $funcoes->insert5();
        break;
    case 6: 
        $funcoes->insert6();
        break;
    case 7: 
        $funcoes->insert7();
        break;
    case 8: 
        $funcoes->replace();
        break;
    case 9: 
        $funcoes->update(readline('Passe um nome para substituir os dados:'));
        break;
    case 10: 
        $funcoes->delete(readline('Informe um id para deletar:'));
        break;
    case 11: 
        $funcoes->queryBasica();
        break;
    case 12: 
        $funcoes->queryBasica2();
        break;
    case 13: 
        $funcoes->queryFirstRow();
        break;
    case 14: 
        $funcoes->queryFirstField();
        break;
    case 15: 
        $funcoes->queryFirstList();
        break;
    case 16: 
        $funcoes->queryFirstColumn();
        break;
    case 17: 
        $funcoes->queryFullColumns();
        break;
    case 18:
        $funcoes->queryWalk();
        break;
    default:
        echo 'Escolha um numero de uma função existente...';
        break;
}




?>