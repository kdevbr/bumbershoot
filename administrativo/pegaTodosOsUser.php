<?php

include ('../naoeindex/bd.php');
header('Content-Type: application/json');

$result = $conn->query('SELECT * FROM `usuarios`');

$usuarios = array();
while($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}
    
echo json_encode($usuarios);

$conn->close();