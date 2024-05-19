<?php

$dbHost = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "mckevin";

$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

?>