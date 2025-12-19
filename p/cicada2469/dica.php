<?php 
include('../../naoeindex/bd.php');

$res = $conn->query("SELECT `save` FROM `usuarios_page` WHERE `paginas_id` = 68 AND `usuarios_id` = ".$_SESSION['userId']);
$save = json_decode($res->fetch_assoc()['save']);

$nivel = $save->nivel;
$aura = $save->aura;
if($aura < 1){
    http_response_code(400);
    exit;
}else{
    $aura -= 1;
    $res = $conn->query("SELECT `dica` FROM `cicada2469` WHERE `nivel` = $nivel");
    $dica = $res->fetch_assoc()['dica'];
    $conn->query("UPDATE `usuarios_page` SET `save` = '".json_encode(['nivel'=>$nivel,'aura'=>$aura])."' WHERE `paginas_id` = 68 AND `usuarios_id` = ".$_SESSION['userId']);
    echo json_encode(['dica'=>$dica]);
}
