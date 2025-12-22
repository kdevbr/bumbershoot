<?php 
include('../../naoeindex/bd.php');

$res = $conn->query("SELECT `save` FROM `usuarios_page` WHERE `paginas_id` = 68 AND `usuarios_id` = ".$_SESSION['userId']);
$save = json_decode($res->fetch_assoc()['save'],true);

$nivel = $save['nivel'];
if($save['aura'] < 1){
    http_response_code(400);
    exit;
}else{

    if($save['dicasCompradas'][$nivel] != true){
        $save['aura']-= 1;
    }
    $res = $conn->query("SELECT `dica` FROM `cicada2469` WHERE `nivel` = $nivel");
    $dica = $res->fetch_assoc()['dica'];

    $save['dicasCompradas'][$nivel] = true;

    $conn->query("UPDATE `usuarios_page` SET `save` = '".json_encode($save)."' WHERE `paginas_id` = 68 AND `usuarios_id` = ".$_SESSION['userId']);
    echo json_encode(['dica'=>$dica]);
}
