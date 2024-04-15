<?php

class rafaax {

    public function insert1(){
        DB::insert('quantidade', ['quantidade' => 99]);
        echo DB::affectedRows();
    }

    public function insert2(){
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

    public function insert3(){
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


    public function insert4(){
        // mysqli_last_inserted_id
        DB::insert('quantidade', array(
            'quantidade' => readline("Digite uma quantidade para inserir no db: ")
        ));

        echo 'Inserted ID: '.  DB::insertId();
    }

    public function insert5(){
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

}




