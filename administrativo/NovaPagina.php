<?php
include ('../naoeindex/bd.php');

if (!empty($_FILES['files'])) {
    $uploadsDir = '../p/'.$nome.'/'; // Diretório onde salvar os arquivos
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0777, true); // Cria o diretório, se não existir
    }

$nome = $_POST['pageName'];
$pageInicioS = $_POST['pageInicioS'];
$pagepageInicioSelect = $_POST['pagepageInicioSelect'];
$pageInfo = $_POST['pageInfo'];

$conn->prepare("INSERT INTO ");
    foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
        $fileName = basename($_FILES['files']['name'][$key]);
        $filePath = $uploadsDir . $fileName;

        // Move o arquivo para o diretório de upload
        if (move_uploaded_file($tmpName, $filePath)) {
            echo "Arquivo {$fileName} enviado com sucesso!";
        } else {
            echo "Erro ao enviar o arquivo {$fileName}.";
        }
    }
}
