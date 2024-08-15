<?php
header('Content-Type: application/json');

    $uploadDir = 'imgsFundo/';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        
        // Diretório onde o arquivo será salvo
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $uploadFile = $uploadDir . basename($file['name']);

        if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        }
    } 
}

$arquivos = glob($uploadDir . "*", GLOB_BRACE);

$fileData = array();
foreach ($arquivos as $file) {
    $fileData[] = array(
        'name' => $uploadDir.basename($file),
        'modified' => date("Y-m-d H:i:s", filemtime($file)) // Data de modificação no formato YYYY-MM-DD HH:MM:SS
    );
}

// Ordena o array por data de modificação, do mais recente para o mais antigo
usort($fileData, function($a, $b) {
    return strtotime($b['modified']) - strtotime($a['modified']);
});

// Converte o array em JSON e exibe
echo json_encode($fileData);
?>
