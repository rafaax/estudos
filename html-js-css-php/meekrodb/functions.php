<?php

class rafaax {
    
    public $buscar = array(
        'quantidade' => 60,
        'first_row' => 100  
    );


    public function connection(){
        DB::$user = 'root';
        DB::$password = '';
        DB::$dbName = 'raphael';
    }

    public function queryBasica(){
        $users = DB::query("SELECT * from users where nome = %s ", 'raphael' );

        $array_users = [];
        foreach($users as $user){
            $array_users[] = $user['nome'];
        }
        echo json_encode($array_users);
    }

    public function queryBasica2(){
        $quantidade = DB::query('SELECT * from quantidade where quantidade <=  "%i_quantidade" ', $this->buscar);
        foreach($quantidade as $quantidade_value){
            echo 'ID: ' . $quantidade_value['id'] . ' ---- Quantidade:' . $quantidade_value['quantidade'];
        }
    }

    public function queryFirstRow(){
        $one_row = DB::queryFirstRow('SELECT * from quantidade where quantidade <= %i_first_row', $this->buscar);
        print_r($one_row);
    }

    public function queryFirstField(){
        $first_field = DB::queryFirstField('SELECT quantidade from quantidade order by id desc');
        echo 'Quantidade do Ultimo ID: ' . $first_field;
    }

    public function queryFirstList(){
        list($id, $quantidade) = DB::queryFirstList('select id, quantidade from quantidade order by id desc');
        echo "ID: $id \n";
        echo "Quantidade: $quantidade";
    }

    public function queryFirstColumn(){
        $quantidades = DB::queryFirstColumn('SELECT quantidade from quantidade');
        print_r($quantidades);
    }

    public function queryFullColumns(){
        $full_columns = DB::queryFullColumns('SELECT * from users');
        print_r($full_columns);
    }

    public function queryWalk(){
        $Walk = DB::queryWalk("SELECT * FROM users");
        while ($row = $Walk->next()) {
            print_r($row);
        }
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

    public function replace(){ 
        $replace = DB::replace('users', [
            'id' => 5,
            'nome' => 'Raphael',
            'sobrenome' => 'Meireles'
        ]);

        echo $replace;
    }

    public function update($nome){ 
        $update = DB::update('users', 
            [
                'email' => 'poo@gmail.com',
                'telefone' => '98833390',
                'cpf' => '999999'
            ],
            "nome=%s", $nome
        );

        if($update == 0){
            echo 'Nao foi encontrado registros com o nome: ' . $nome;
        }else{
            echo 'Alterações feitas!';
        }
        
    }

    public function delete($id){
        $delete = DB::delete('users', "id=%i", $id);
        echo $delete;
    }

}