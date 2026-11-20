<?php
include('../../naoeindex/bd.php');

ini_set('max_file_uploads', 150);
ini_set('upload_max_filesize', '100M');
ini_set('post_max_size', '500M');

$name = $_POST['enigmaName'];
$autor = $_POST['pageAutorSelect'];
$nivel = $_POST['pageNivel'];
$dica = $_POST['DicaName'];
$resposta = $_POST['SenhaName'];

header('Content-Type: application/json; charset=utf-8');

try {
    if (empty($_FILES['files']['name'])) {
        throw new RuntimeException('Nenhum arquivo foi enviado.');
    }

    $uploadsDir = 'niveis/';

    if ($conn->query("SELECT * FROM cicada2469 WHERE `nivel` = '$nivel'")->num_rows >= 1) {
        throw new RuntimeException('Esse nível já existe.');
    }

    $nivelDir = $uploadsDir . $nivel . '/';
    if (!is_dir($nivelDir) && !mkdir($nivelDir, 0777, true)) {
        throw new RuntimeException('Não foi possível criar a pasta do nível.');
    }

    foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
        if ($_FILES['files']['error'][$key] !== UPLOAD_ERR_OK) {
            throw new RuntimeException(
                'Erro no upload de ' . $_FILES['files']['name'][$key] .
                ': código ' . $_FILES['files']['error'][$key]
            );
        }

        $originalName = basename(str_replace('\\', '/', $_FILES['files']['name'][$key]));
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if ($extension === 'html' || $extension === 'htm') {
            $fileName = 'index.html';
        } else {
            $fileName = preg_replace('/[\x00-\x1F\x7F]/', '_', $originalName);
        }

        $filePath = $nivelDir . $fileName;
        if (!move_uploaded_file($tmpName, $filePath)) {
            throw new RuntimeException('Não foi possível salvar o arquivo ' . $originalName . '.');
        }
    }

    $name = $conn->real_escape_string($name);
    $autor = $conn->real_escape_string($autor);
    $dica = $conn->real_escape_string($dica);
    $resposta = $conn->real_escape_string($resposta);
    $filePath = $conn->real_escape_string($nivelDir . 'index.html');

    if (!$conn->query("INSERT INTO cicada2469 (nivel, dica, resposta, nome, criador, urlPastaNivel)
        VALUES ('$nivel', '$dica', '$resposta', '$name', '$autor', '$filePath')")) {
        throw new RuntimeException('Erro ao salvar o nível no banco de dados.');
    }

    echo json_encode(['sucesso' => 'Nível enviado com sucesso.'], JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode([
        'erro' => $error->getMessage(),
        'arquivo' => $error->getFile(),
        'linha' => $error->getLine()
    ], JSON_UNESCAPED_UNICODE);
}

$conn->close();
