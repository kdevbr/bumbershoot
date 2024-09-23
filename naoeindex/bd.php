<?php

session_start();

function is_xampp() {
    // Checa o sistema operacional, que geralmente é Windows no XAMPP
    if (stristr(php_uname(), 'Windows')) {
        // Verifica se XAMPP está instalado procurando por pastas específicas do XAMPP
        if (file_exists('C:\\xampp') || file_exists('C:\\xampp\\htdocs')) {
            return true;
        }
    }
    return false;
}

// Configuração de banco de dados com base na verificação do XAMPP
if (is_xampp()) {
    // Configurações do banco de dados para XAMPP
    $dbHost = "localhost";
    $dbUser = "root";
    $dbPassword = "";
    $dbName = "mckevin";
} else {
    // Configurações do banco de dados para outro servidor
    $dbHost = 'sql313.infinityfree.com';
    $dbUser = 'if0_34909276';
    $dbPassword = 'V1VIXpNpLm';
    $dbName = 'if0_34909276_bancodedados';
}


global $conn;

$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
$conn->query(query: "SET time_zone = '-03:00'");
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

?>