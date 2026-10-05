<?php 

require_once 'Connection.php';

class Logs {

     public function inserirLog($mensagem, $usuario){
        $insert = DB::insert('logsadministrador', array(
            'mensagem' => $mensagem,
            'usuario' => $usuario
        ));

        return $insert;
    }

}