<?php
include('../naoeindex/bd.php');

$result = $conn->query("SELECT * FROM paginas WHERE `TelaInicial` > 0");
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
$conn->close();
echo json_encode($rows);