<?php
include('../../naoeindex/bd.php');

$res = $conn->query("SELECT * FROM `cicada2469`");
$res = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>