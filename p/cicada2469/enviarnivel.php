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

if (!empty($_FILES['files'])) {

    $uploadsDir = 'niveis/';

    if ($conn->query("SELECT * FROM cicada2469 WHERE `nivel` = '$nivel'")->num_rows < 1) {

        print_r($_FILES['files']);
        foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
            $fileName = ($nivel."/index.html");
            $filePath = $uploadsDir . $fileName;

            if (!is_dir(dirname($filePath))) {
                mkdir(dirname($filePath), 0777, true);
            }

            if (move_uploaded_file($tmpName, $filePath)) {

            } else {
                echo "Erro ao salvar";
            }
        }

        if ($conn->query("INSERT INTO cicada2469 (nivel, dica, resposta, nome ,criador, urlPastaNivel) 
        VALUES ('$nivel', '$dica', '$resposta', '$name', '$autor', '$filePath')")
        ){

        }else {
            echo "Erro ao salvar no banco de dados";
        }
    } else {
        echo "Ja existe";
    }
}else {
    echo "Nenhum arquivo enviado";
}
$conn->close();
