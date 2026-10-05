<?php

header('Content-Type: application/json; charset=utf-8');

require 'db/init.php';

use OTPHP\TOTP;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;

$client_data = json_decode(file_get_contents('php://input'), true);

$userEmail = filter_var($client_data['user'] ?? '', FILTER_VALIDATE_EMAIL);

if (!$userEmail) {
    exit(json_encode(array('erro' => true, 'msg' => 'Formato de e-mail inválido.')));
}

$user = DB::queryFirstRow('SELECT * from users where email = %s', $userEmail);

if(!$user) exit(json_encode(array('erro' => true, 'msg' => 'Usuário não existe')));

if($user['totp_enabled'] == 1) exit(json_encode(array('erro' => true, 'msg' => 'Usuário já tem 2FA habilitado...')));

$user_id = $user['id'];

$otp = TOTP::create(null, 30, 'sha1', 6);
$otp->setLabel($userEmail);
$otp->setIssuer('Vetron');
$secret = $otp->getSecret();

DB::update('users', ['temp_totp_secret' => $secret], ['id' => $user_id]);

$provisioningUri = $otp->getProvisioningUri();

$qrCode = new QrCode(
    data: $provisioningUri,
    encoding: new Encoding('UTF-8'),
    roundBlockSizeMode: RoundBlockSizeMode::Margin,
    errorCorrectionLevel: ErrorCorrectionLevel::High,
    size: 300,
    margin: 10,
);


$writer = new PngWriter();
$qrCodeResult = $writer->write($qrCode);

$dataUri = $qrCodeResult->getDataUri();

exit(json_encode(['erro' => false, 'msg' => 'QR Code gerado com sucesso!', 'qrcodebase64' => $dataUri]));

?>