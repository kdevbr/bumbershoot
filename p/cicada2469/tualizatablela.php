<?php
include('../../naoeindex/bd.php');
$inicio = microtime(true);
if(isset($_POST['tabela'])){
$jsop = ($_POST['tabela']);
foreach($jsop as $id => $valor){
    $id = (int)$id;

    $cases[] = "WHEN $valor[id] THEN '$valor[nivel]'";
}

$conn->query("UPDATE cicada2469 SET nivel = CASE id
" . implode("\n", $cases) . "
END");
$fim = microtime(true);

echo json_encode(array("sucesso" => $conn->affected_rows > 0 ? $conn->affected_rows." Linhas Atualizadas, Em ".number_format($fim - $inicio, 4)." Segundos" : "Nenhuma linha foi atualizada."));
exit;
}else{
    http_response_code(400);
    echo json_encode(array("erro" => "Requisição inválida"));
    exit;
}