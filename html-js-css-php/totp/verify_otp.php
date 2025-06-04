<?php 

header('Content-Type: application/json; charset=utf-8');

require 'db/init.php';

use OTPHP\TOTP;

$client_data = json_decode(file_get_contents('php://input'), true);

$emailUser = $client_data['email'];
$otpCodeFromUser = $client_data['otp_code'];

if (empty($emailUser)) exit(json_encode(array('msg' => 'E-mail do usuário não fornecido.', 'erro' => true)));

if (empty($otpCodeFromUser)) exit(json_encode(array('msg' => 'Código OTP não fornecido.', 'erro' => true)));
    
if (!preg_match('/^\d{6}$/', $otpCodeFromUser)) exit(json_encode(array('msg' => 'Formato do código OTP inválido. Deve conter 6 dígitos numéricos.', 'erro' => true)));

$user = DB::queryFirstRow("SELECT id, temp_totp_secret, totp_secret, totp_enabled FROM users WHERE email = %s", $emailUser);
