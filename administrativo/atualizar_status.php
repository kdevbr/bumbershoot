<?php

include ('../naoeindex/bd.php');
header('Content-Type: application/json');

if (isset($_SESSION['userId'])) {

    date_default_timezone_set('America/Sao_Paulo'); // Substitua pelo fuso horário desejado

    
    $update_activity = "UPDATE usuarios SET last_activity = NOW() WHERE id = ?";
    $stmt = $conn->prepare($update_activity);
    $stmt->bind_param("i", $_SESSION['userId']);
    $stmt->execute();

    // No arquivo onde você exibe o status dos administradores
    $sql = "SELECT username, last_activity, id, poder, icon FROM usuarios WHERE `poder` > 99";
    $result = $conn->query($sql);
    $current_time = time();
    $time_limit = 10; // segundos
    $status = array();
    while ($row = $result->fetch_assoc()) {
        $last_activity_time = strtotime($row['last_activity']);
        if (($current_time - $last_activity_time) <= $time_limit) {
            $status[] = array(
                'user'=> $row['username'],
                'id'=> $row['id'],
                'poder'=> $row['poder'],
                'icon'=> $row['icon'],
                'status' => 1
            );
        } else {
            $status[] = array(
                'user'=> $row['username'],
                'id'=> $row['id'],
                'poder'=> $row['poder'],
                'icon'=> $row['icon'],
                'status' => 0
            );

        }

    }
    echo json_encode($status, JSON_PRETTY_PRINT);

}
