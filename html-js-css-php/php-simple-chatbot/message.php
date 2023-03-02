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
function tirarAcentos($string){
    return 
    preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/"),
    explode(" ","a A e E i I o O u U n N"),$string);
}
?>
