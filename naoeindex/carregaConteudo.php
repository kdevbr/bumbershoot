<?php
include_once('bd.php');
$url = str_replace('/', '', $_GET['page']);
setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set('America/Sao_Paulo');
$dados = array();

$res = $conn->query("SELECT * FROM `paginas` WHERE linkURL = '$url'");
if ($res->num_rows > 0) {
    $rou = $res->fetch_assoc();
    $dados['sql'] = $rou;
    $dados['dados'] = [
        'titulo' => $rou['titulo'],
        'data' => '' . date('d/m/Y'),
        'autor' => 'ID#'. $rou['iduser'],
        'conteudo' => [
            'img' => null,
            'subtitulo' => $rou['titulo'],
            'desc' => $rou['data']
        ],
        'link' => $rou['corpo']
    ];
}else{
    $dados['dados'] = [
        'titulo' => '404 Pagina nao encontrada',
        'data' => '' . date('d/m/Y'),
        'autor' => 'ID#',
        'conteudo' => 'ta errado amigao',
        'erro' => 404
    ];
}

if ($url == "desconectar") {
    unset($_SESSION['logade']);
    unset($_SESSION['userId']);
    unset($_SESSION['poder']);
    unset($_COOKIE['lembrarDeMim']);
    setcookie('lembrarDeMim', '', -1, '/');
    $dados['Refrache'] = true;
}

if ($url == "administrativo") {
    $dados['ADM'] = true;
}

echo json_encode($dados);