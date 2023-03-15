<?php
$conexao = mysqli_connect("localhost", "rapha", "admin", "chatbot");
$mysqli = new mysqli("localhost","rapha","admin","chatbot");

$pergunta = mysqli_real_escape_string($conexao, $_POST['texto']);
$perguntalowercase = mb_strtolower($pergunta,'UTF-8');

// tirar caracteres especiais 
$tirarbarra = str_replace('/', '', $perguntalowercase);
$tirartraço = str_replace('-', '', $tirarbarra);
$tirarexclamacao = str_replace('!','',$tirartraço);
$tirarinterro = str_replace('?','',$tirarexclamacao); 
$tirarunderline = str_replace('_','',$tirarinterro);
$tirararroba = str_replace('@','',$tirarunderline);
$tirarasterisco = str_replace('*','',$tirararroba);
$prapara = str_replace('pra', 'para', $tirarasterisco);
// 


$perguntafinal = tirarAcentos($prapara); 

$resposta = "SELECT replies FROM chatbot WHERE queries LIKE '%$perguntafinal%'";
$run_query = mysqli_query($conexao, $resposta) or die("Não conectou ao banco, estou arrumando -_-");

// logica de perguntas

$rows = mysqli_num_rows($run_query);

if($pergunta == 'nao esta funcionando'){    
    echo 'O que não esta funcionando?';
}else if($pergunta == 'preciso de ajuda'){

    $retorno =  "Pergunte qualquer coisa para mim.";
    echo $retorno;
    $sql = "INSERT into audit(msg,resposta) values ('preciso de ajuda', '$retorno');";  
    mysqli_query($conexao, $sql);

}else if($perguntafinal == "aplicativo" || $perguntafinal == "aplicativo celular"){
    echo 'Digite "Aplicativo IOS" para dispositivos da Apple
        <br><br>Digite "Aplicativo Android" para dispositivos Android"';        
}else if( $perguntafinal == 'perguntas' || $perguntafinal == 'duvidas' || $perguntafinal == 'ajuda'){
    
    echo '1 - É possivel ordenar por ordem alfabética?<br>';
    echo '2 - Como organizo as informações na tela?<br>';
    echo '3 - Como altero o mapa?<br>';
    echo '4 - Como troco a placa do meu veiculo?<br>';
    echo '5 - Qual a diferença entre o aplicativo e o site?<br>';
    echo '6 - O que consigo fazer com o aplicativo?<br>';
    echo '7 - Não sei como rastrear meu veiculo<br>';
    echo '8 - Parou de posicionar<br>';
    echo '9 - Preciso de ajuda com o a localizacao do meu equipamento<br>';
    echo '10 - Para que serve os ícones das informações?<br>';
    echo '11 - Como utilizo a rota percorrida?<br>';
    echo '12 - Qual a diferença entre a rota percorrida e o histórico de posições?<br>';
    echo '13 - Como vejo as posições detalhada por dia?<br>';
    echo '14 - Como exportar para excel?<br>';
    echo '15 - Como troco a senha do meu usuário?<br>';
    echo '16 - Consigo criar um usuário com um dos veículos da minha frota?<br>';
    echo '17 - Como zerar o hodômetro?<br>';
    echo '18 - É possível bloquear meu veiculo?<br>';
    echo 'Digite o número ou digite a pergunta!<br>'; 

}else if($perguntafinal == "1"){

    $retorno = 'Sim, se clicar no nome da coluna “placa” por exemplo, será ordenado por ordem alfabética ou se clicar na coluna “atualização “ será ordenado por ordem de atualização.';
    echo $retorno;
    $sql = "INSERT into audit(msg,resposta) values ('1', '$retorno');";  
    mysqli_query($conexao, $sql);

}else if($perguntafinal == "2"){

    $retorno =  'O grid de informações é simples de editar, se colocarmos o mouse entre as colunas, a seta do mouse será alterado por uma linha com duas setas que é o momento de clicar e segurar para aumentar o tamanho da linha, para trocar o posicionamento das colunas é só clicar segurar em cima da coluna desejada e arrastar para onde deseja colocar e no canto direito abaixo do mapa, tem uma coluna que contem os nomes das colunas, se não quiser deixar uma coluna no grid é só desmarcar para sumir do grid.';
    echo $retorno;
    $sql = "INSERT into audit(msg,resposta) values ('2', '$retorno');";  
    mysqli_query($conexao, $sql);

}else if($perguntafinal == "3"){

    $retorno =  'A substituição do mapa é feita pela pagina “tempo real”  no canto inferior esquerdo do mapa tem um quadrado com um ícone amarelo, é só clicar nesse botão que aparecerá os mapas disponível, clique em alguma opção e veja qual é a  sua preferida';
    echo $retorno;
    $sql = "INSERT into audit(msg,resposta) values ('3', '$retorno');";  
    mysqli_query($conexao, $sql);

}else if($perguntafinal == "4"){
    $retorno = 'Para fazer a alteração da placa do seu veículo pelo sistema Vetorian vá em configurações>veículos> na janela que vai abrir, é só clicar em editar que tem um ícone de lápis e alterar a palca na janela que abrir, após feito a troca da placa é só clicar em salvar. ';
    echo $retorno;
    $sql = "INSERT into audit(msg,resposta) values ('4', '$retorno');";  
    mysqli_query($conexao, $sql);
}else if($perguntafinal == "5"){
    $retorno = 'No site temos as informações completa do seu veiculo como rota percorrica, histórico de posições, excesso de velocidade, tempo de paradas, já no aplicativo só informações mais básicas como localização em tempo real e ancoragem do veículo.';
    echo $retorno;
    $sql = "INSERT into audit(msg,resposta) values ('5', '$retorno');";  
    mysqli_query($conexao, $sql);

}else if($perguntafinal == "6"){
    $retorno = 'Visualizar em tempo real e ancorar seu veiculo para receber uma notificação assim que o veiculo sair do local';
    echo $retorno;
    $sql = "INSERT into audit(msg,resposta) values ('6', '$retorno');";  
    mysqli_query($conexao, $sql);

}
function tirarAcentos($string){
    return 
    preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/"),
    explode(" ","a A e E i I o O u U n N"),$string);
}
?>
