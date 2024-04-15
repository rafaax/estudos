<?php

class rafaax {
    
    public function connection(){
        DB::$user = 'root';
        DB::$password = '';
        DB::$dbName = 'raphael';
    }

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

    public function insert6(){ // exemplo passando um segundo array associativo
        DB::insertUpdate('users', 
        [
            'id' => 1
        ],
        [
            'nome' => 'raphael2',
            'sobrenome' => 'update'
        ]
        );
        // caso exista um valor no id = 1 ele faz o update na coluna nome e na coluna sobrenome

        echo DB::affectedRows();
    }

    public function insert7(){ // exemplo passando um array associativo simples
        DB::insertUpdate('users', [
            'id' => 5,
            'nome' => 'Joe',
            'sobrenome' => 'Rogan'
        ]);

        echo DB::affectedRows();
    }

}