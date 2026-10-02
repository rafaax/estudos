<?php 

$docxFile = 'example.docx';
$pdfFile = 'example_converted.pdf';

$command_to_exec = "python convertion.py $docxFile $pdfFile";

exec($command_to_exec, $docxFile, $pdfFile);
