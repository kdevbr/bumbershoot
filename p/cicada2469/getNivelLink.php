<?php
include_once("../../naoeindex/bd.php");

header('Content-Type: application/json; charset=utf-8');

if (isset($_GET['nivel'])) {
    $nivel = intval($_GET['nivel']);
    $res = $conn->query("SELECT * FROM `cicada2469` WHERE `nivel` = '$nivel'");
    if ($res->num_rows == 0) {
        echo json_encode(['erro' => 'Nível inválido.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $link = $res->fetch_assoc()['urlPastaNivel'];

    // Prepend the root folder path to the link
    $fullLink = $_SERVER['DOCUMENT_ROOT'] . "/p/cicada2469/" . $link;

    // Fetch the HTML content of the full link
    $htmlContent = file_get_contents($fullLink);
    if ($htmlContent === false) {
        echo json_encode(['erro' => 'Não foi possível obter o conteúdo do link.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode(['conteudo' => $htmlContent], JSON_UNESCAPED_UNICODE);
    exit;
} else {
    echo json_encode(['erro' => 'Parâmetro nível não fornecido.'], JSON_UNESCAPED_UNICODE);
    exit;
}

//lyncom: 3
//danilo: 1