<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permitir acesso de qualquer domínio
header('Access-Control-Allow-Methods: GET, POST'); // Permitir métodos GET e POST
header('Access-Control-Allow-Headers: Content-Type');

include_once('bd.php');

$data = array();

$result = $conn->query("SELECT * FROM dados_segundos");
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data['dados_segundos'][] = array(
            'ID' => $row['id'],
            'Data' => $row['data'],
            'Umidade' => $row['Umidade'] . "%",
            'Chuva' => $row['Chuva'] == 1 ? 'Sim' : 'Nao'
        );
    }
}

$result = $conn->query("SELECT * FROM medias_diarias");
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data['medias_diarias'][] = array(
            'ID' => $row['id'],
            'Data' => $row['data'],
            'Umidade' => $row['Umidade'] . "%",
            'Chuva' => $row['Chuva'] == 1 ? 'Sim' : 'Nao'
        );
    }
}

    echo json_encode($data, JSON_PRETTY_PRINT);
