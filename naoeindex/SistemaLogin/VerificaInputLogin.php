<?php 
include_once('../bd.php');
header('Content-Type: application/json; charset=utf-8');
if(isset($_POST['user'])){$user=$_POST['user'];}

if($conn->query("SELECT * FROM usuarios WHERE username = '$user'")->num_rows>0){
    echo json_encode('nao');
}else{
    echo json_encode('ok');
}