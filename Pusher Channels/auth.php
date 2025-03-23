<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
error_log("auth.php foi acessado");
require __DIR__ . '/../vendor/autoload.php';
$options = array(
    'cluster' => 'sa1',
    'useTLS' => true
);

$pusher = new Pusher\Pusher(
    '44b4d3f9ece01dfa8fb6',
    '1f3618851d79f86007ee',
    '1952164',
    $options
);
if($_POST['username'] != "null"){
    $userId = $_POST['username'];
}else{
    $nome_aleatoria = file('nomes.txt', FILE_IGNORE_NEW_LINES)[array_rand(file('nomes.txt', FILE_IGNORE_NEW_LINES))];
    $userId = $nome_aleatoria."_".mt_rand(0, 9);  //ID único gerado
}


    $data = [
        "user_id" => $userId,  // Um identificador único para o usuário
        "user_info" => [
            "name" => "Capivara_" . $userId  // Informações adicionais sobre o usuário
        ]
    ];

    // Retorna a autorização do canal
    echo $pusher->authorizeChannel($_POST['channel_name'], $_POST['socket_id'], json_encode($data));
