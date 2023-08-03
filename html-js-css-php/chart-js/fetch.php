<?php 
include_once 'credenciais.php';

if($_GET['type'] == 'barra'){
    $sql = "SELECT formato, hour(start_time) as hora from calendario.events ORDER BY id desc";
    $query = mysqli_query($conexao, $sql);

    $array1 = array();
    $array2 = array();

    while ($row = mysqli_fetch_assoc($query)) {
        
        if($row['hora'] >= 12){
            $array2[] = $row;
        }else{
            $array1[] = $row;
        }

    }

    $presencial = 0;
    $remoto = 0;
    $compromisso_pessoal = 0;

    foreach($array1 as $c){
        if($c['formato'] == 'Presencial'){
            $presencial += 1;
        }else if($c['formato'] == 'Remoto'){
            $remoto += 1;
        }else if($c['formato'] == 'Compromisso Pessoal'){
            $compromisso_pessoal +=  1;
        }
    }

    $count = array(
        'presencial' => $presencial,
        'remoto'=> $remoto,
        'compromisso_pessoal'=> $compromisso_pessoal 
    );

    $presencial2 = 0;
    $remoto2 = 0;
    $compromisso_pessoal2 = 0;


    foreach($array2 as $c){
        if($c['formato'] == 'Presencial'){
            $presencial2 += 1;
        }else if($c['formato'] == 'Remoto'){
            $remoto2 += 1;
        }else if($c['formato'] == 'Compromisso Pessoal'){
            $compromisso_pessoal2 +=  1;
        }
    }

    $count2 = array(
        'presencial' => $presencial2,
        'remoto'=> $remoto2,
        'compromisso_pessoal'=> $compromisso_pessoal2 
    );


    echo json_encode(
        array(
            'count1' => $count,
            'count2' => $count2
        )
    );

}else if($_GET['type'] == 'linha'){
    $sql = "SELECT formato, month(start) as mes from calendario.events ORDER BY START desc";
    $query = mysqli_query($conexao, $sql);

    $array1 = array();
    $array2 = array();
    $countArray = array();



    while ($row = mysqli_fetch_assoc($query)) {
        
        $array1[] = array(
            'mes' => $row['mes'],
            'formato' =>$row['formato']
        );
    }

    foreach($array1 as $arr){
        $mes = $arr['mes'];
        $formato = $arr['formato'];
        if(isset($countArray[$mes])){
            $countArray[$mes]++;
        }else{
            $countArray[$mes] = 1;
        }
    }
    echo json_encode(
        array(
            'countArray' => $countArray
        )
    );


}


?>