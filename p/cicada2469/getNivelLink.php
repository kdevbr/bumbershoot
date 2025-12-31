<?php
include_once("../../naoeindex/bd.php");

header('Content-Type: application/json; charset=utf-8');

if(isset($_GET['nivel'])){
    $nivel = intval($_GET['nivel']);
    $res = $conn->query("SELECT * FROM `cicada2469` WHERE `nivel` = '$nivel'");
    if($res->num_rows == 0){
        echo json_encode(['erro' => 'Nível inválido.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $link = $res->fetch_assoc()['urlPastaNivel'];
    echo json_encode(['link' => $link], JSON_UNESCAPED_UNICODE);
    exit;
} else {
    echo json_encode(['erro' => 'Parâmetro nível não fornecido.'], JSON_UNESCAPED_UNICODE);
    exit;
}