<?php
session_start();


if(isset($_POST['dados'])){
    $dados = $_POST['dados'];
    $save = $_POST['save'];
    $iduser = $_SESSION['userId'];
}

include('../../naoeindex/bd.php');

if(isset($_GET['Verifica'])){
if(isset($_SESSION['logade'])){

echo json_encode($_SESSION['username']);
}else{
    echo json_encode(false);
}
}elseif(isset($_POST['dados'])){

$dados = $conn->real_escape_string($dados);

$sql = "INSERT INTO bozoclicker (idusername2, id, savee) VALUES ($iduser, $iduser, '$save') 
ON DUPLICATE KEY UPDATE savee = VALUES(savee)";
$conn->query($sql);

}elseif(isset($_POST['BuscaTabela'])){

        $sql = "SELECT usuarios.username, usuarios.icon, bozoclicker.savee FROM bozoclicker JOIN usuarios ON usuarios.id = bozoclicker.idusername2 ORDER BY bozoclicker.id";
        $res = $conn->query($sql);

        if($res){
            $dadosplayers = $res->fetch_all(MYSQLI_ASSOC);
            echo json_encode($dadosplayers);
        }
    }
$conn->close();
