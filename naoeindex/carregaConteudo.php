<?php
$url = $_GET['page'];
//$tipo = $_GET['tipo'];

setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set('America/Sao_Paulo');

$dados = [
'titulo' => 'teste Nº 9108',
'data' => ''.date('d/m/Y'),
'autor' => 'eu',
'conteudo' => 'Voce esta em: bumbershoot.com.br'.$url,
'tipo'=> 'link'
];


$jsonData = json_encode($dados);

echo $jsonData;
