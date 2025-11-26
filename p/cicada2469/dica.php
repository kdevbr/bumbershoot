<?php 
include('../../naoeindex/bd.php');

$res = $conn->query("SELECT `save` FROM `usuarios_page` WHERE `paginas_id` = 68 AND `usuarios_id` = ".$_SESSION['usuario_id']);
