<?php
include_once("../../naoeindex/bd.php");
if (!$_SESSION['logade']) {
    http_response_code(401);
    echo json_encode(array("erro" => "Usuário não logado"));
    exit;
}

$id = $_SESSION['userId'];
if (empty($_GET)) {
    $res = $conn->query("SELECT * FROM `usuarios_page` WHERE usuarios_id = '$id'");
    if ($res->num_rows > 0) {
        echo json_encode(['dados' => $res->fetch_assoc()['save']], JSON_UNESCAPED_UNICODE);
        //exit;
    } else {


$json_string = json_encode($save = [
    'nivel' => 1,
    'aura' => 0
]);

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
$json_string = json_encode($save = [
    'nivel' => 1,
    'aura' => 0
]);
echo $json_string;