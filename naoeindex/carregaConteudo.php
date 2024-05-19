<?php
$url = $_GET['page'];

$dados = ['titulo' => 'Bozoclicker',
'data' => 'hoje',
'autor' => 'Caralho',
'conteudo' => 'ser, ou nao  ser?'
];

$jsonData = json_encode($dados);

header('Content-Type: application/json');
echo $jsonData;
?>
