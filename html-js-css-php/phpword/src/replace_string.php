<?php

require_once '../vendor/autoload.php';
use \PhpOffice\PhpWord\Shared\Html;
use \PhpOffice\PhpWord\PhpWord;

$template = new \PhpOffice\PhpWord\TemplateProcessor('template.docx');

$data_post = array(
    'nome' => 'Raphael',
    'empresa' => 'Ssector7'
);

foreach ($data_post as $chave => $valor) {
    // echo "('$chave' => '$valor')";
    $template->setValue($chave, $valor);
}
$template->saveAs('template_replaced.docx');