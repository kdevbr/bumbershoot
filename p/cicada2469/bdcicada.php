<?php
include_once("../../naoeindex/bd.php");

header('Content-Type: application/json; charset=utf-8');

if (!$_SESSION['logade']) {
    http_response_code(401);
    echo json_encode(array("erro" => "Usuário não logado"));
    exit;
}

$id = $_SESSION['userId'];

if (empty($_POST)) {
    $res = $conn->query("SELECT * FROM `usuarios_page` WHERE usuarios_id = '$id'");
    if ($res->num_rows > 0) {
        $json = json_decode(stripslashes($res->fetch_assoc()['save']));
        echo json_encode(['dados' => $json], JSON_UNESCAPED_UNICODE);
        //exit;
    } else {


$json_string = [
    'nivel' => 1,
    'aura' => 0
];

// encode the array as JSON and escape for the SQL query
$json_string = $conn->real_escape_string(json_encode($json_string, JSON_UNESCAPED_UNICODE));

        $conn->query("INSERT INTO `usuarios_page` (usuarios_id,`paginas_id`, `save`) VALUES ('$id','68','{$json_string}')"); 
        if ($conn->affected_rows > 0) {
            echo json_encode(['dados' => 'Usuario Criado'], JSON_UNESCAPED_UNICODE);
            //exit;
        } else {
            echo json_encode(['erro' => 'Erro ao criar o save.'], JSON_UNESCAPED_UNICODE);
            //exit;
        }
    }
}
if(isset($_POST['code'])){
$res = $conn->query("SELECT `save` FROM `usuarios_page` WHERE `usuarios_id` = 63");
if($res->num_rows == 0){
    codigoInvalido();
}
    $jsonSave = json_decode($res->fetch_assoc()['save']);
    $nivel = $jsonSave->nivel;

    $res = $conn->query("SELECT `resposta` FROM `cicada2469` WHERE `nivel` = '$nivel'");
if($res->num_rows == 0){
    codigoInvalido();
}
    $resposta = $res->fetch_assoc()['resposta'];
    if($resposta !== $_POST['code']){
        codigoInvalido();
    }

    $jsonSave->nivel++;
    $jsonSave->aura++;

    $newSave = $conn->real_escape_string(json_encode($jsonSave, JSON_UNESCAPED_UNICODE));
    $conn->query("UPDATE `usuarios_page` SET `save` = '$newSave' WHERE `usuarios_id` = '$id' AND `paginas_id` = 68");
    if($conn->affected_rows == 0){
        codigoInvalido();
    }
    echo json_encode(['Check' => true, 'Save' => $jsonSave], JSON_UNESCAPED_UNICODE);
    exit;

}

function codigoInvalido() {
    echo json_encode(['Check' => false], JSON_UNESCAPED_UNICODE);
    exit;
}
