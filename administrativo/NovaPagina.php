<?php
include('../naoeindex/bd.php');

$nome = $_POST['pageName'];
$pageInicioS = $_POST['pageInicioS'];
$pagepageInicioSelect = $_POST['pagepageInicioSelect'];
$pageInfo = $_POST['pageInfo'];

if (!empty($_FILES['files'])) {


    $uploadsDir = '../p/' . $nome . '/';
    $uploadsDir2 = '/p/' . $nome . '/';
    $link = $nome;

    $link = strtolower($link);
    $link = trim($link);
    $link = preg_replace('/\s+/', '-', $link);
    $link = preg_replace('/[^a-z0-9\-]/', '', $link);

    if ($conn->query("SELECT * FROM paginas WHERE `linkURL` = '$link'")->num_rows < 1) {

        if (
            $conn->query("INSERT INTO paginas (titulo, `data`, corpo, linkURL) 
                                VALUES ('$nome', '$pageInfo', '$uploadsDir2', '$link')")
        ) {
            echo "dadoSalvos";
        }
        ;

        if (!is_dir($uploadsDir)) {
            if (!mkdir($uploadsDir, 0777, true)) {
                die("Erro ao criar o diretório {$uploadsDir}");
            }
        }

        foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
            $fileName = basename($_FILES['files']['name'][$key]);
            $filePath = $uploadsDir . $fileName;

            if (move_uploaded_file($tmpName, $filePath)) {
                echo "Arquivo {$fileName} enviado com sucesso!";
            } else {
                echo "Erro ao enviar o arquivo {$fileName}.";
            }
        }
    }else{
        echo "Ja existe";
    }

}