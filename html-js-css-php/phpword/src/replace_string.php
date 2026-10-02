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

$section = (new PhpWord())->addSection();

Html::addHtml($section, '', false, false);

$containers = $section->getElements();

$template->cloneBlock('htmlblock', count($containers), true, true);

for($i = 0; $i < count($containers); $i++) {
    $template->setComplexBlock('html#' . ($i+1), $containers[$i]);
}

$template->saveAs('template_replaced.docx');