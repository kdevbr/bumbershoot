<?php
include('../naoeindex/bd.php');

ini_set('max_file_uploads', 150);
ini_set('upload_max_filesize', '100M');
ini_set('post_max_size', '500M');


$nome = $_POST['pageName'];
$subtitulo = $_POST['pageSubtitulo'];
$autor = $_POST['pageAutorSelect'];
$pageInicioS = $_POST['pageInicioS'];
if($pageInicioS == "on"){
    $pagepageInicioSelect = $_POST['pagepageInicioSelect'] + 1;
}
$pageInfo = $_POST['pageInfo'];

if (!empty($_FILES['files'])) {


    $uploadsDir = '../p/';
    $uploadsDirImg = '../p/img/';
    $caminhoImg;
    $uploadsDir2 = '/p/' . explode('/', $_FILES['files']['full_path'][0])[0];
    $link = $nome;

    $link = strtolower($link);
    $link = trim($link);
    $link = preg_replace('/\s+/', '-', $link);
    $link = preg_replace('/[^a-z0-9\-]/', '', $link);

    if ($conn->query("SELECT * FROM paginas WHERE `linkURL` = '$link'")->num_rows < 1) {

        //print_r($_FILES['files']);
        foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
            $fileName = ($_FILES['files']['full_path'][$key]);
            $filePath = $uploadsDir . $fileName;

            if (!is_dir(dirname($filePath))) {
                mkdir(dirname($filePath), 0777, true);
            }

            if (move_uploaded_file($tmpName, $filePath)) {

            } else {
echo "Erro ao salvar";
            }
        }
        if (!empty($_FILES['pageImg'])) {
            $caminhoImg = $uploadsDirImg . explode('/', $_FILES['files']['full_path'][0])[0] . '/' . $_FILES['pageImg']['full_path'];
            if (!is_dir(dirname($caminhoImg))) {
                mkdir(dirname($caminhoImg), 0777, true);
            }
            if (move_uploaded_file($_FILES['pageImg']['tmp_name'], $caminhoImg)) {

            } else {
echo "Erro ao salvar";
            }
        }

        if (
            $conn->query("INSERT INTO paginas (titulo, `data`, corpo, linkURL, linkIMG, autor, subtitulo) 
        VALUES ('$nome', '$pageInfo', '$uploadsDir2', '$link', '$caminhoImg', '$autor', '$subtitulo')")
        ) {

            if ($pageInicioS == "on") {

                $conn->query("UPDATE paginas SET `TelaInicial` = 0 WHERE `TelaInicial` = $pagepageInicioSelect");
                $conn->query("UPDATE paginas SET `TelaInicial` = $pagepageInicioSelect WHERE `linkURL` = '$link'");

                echo "TablelaSalvos";
            }
            echo $pageInicioS;
            echo $pagepageInicioSelect;
        }else{
            echo "Erro ao salvar no banco de dados";
        }
    } else {
        echo "Ja existe";
    }

}
$conn->close();
