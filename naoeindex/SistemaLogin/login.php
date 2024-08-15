<?php
header('Content-Type: application/json; charset=utf-8');
include_once ('../bd.php');
require '../classesPHP/LoginCLASS.php';

$x = new Usuario();

if (isset($_POST['user'])) {
    $username = $_POST['user'];
}
if (isset($_POST['pass'])) {
    $password = $_POST['pass'];
}
if (isset($_POST['tipo'])) {
    $tipo = $_POST['tipo'];
}

switch($tipo){
case 'veri':
        $x->PegarDados();
    break;
case 'login':
    if($x->login($username ,$password) == 0 ){
        $x->PegarDados();
    }else{
     echo json_encode(["Codigo"=>$x->login($username ,$password)]);
    }
    break;
}