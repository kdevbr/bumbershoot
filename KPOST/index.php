<?php 
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo'); // ou GMT, se preferir

use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;
use Kreait\Firebase\Factory;
require __DIR__ . '/vendor/autoload.php';

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';


$factory = (new Factory)->withServiceAccount('keyfirebase.json');
    $auth = $factory->createAuth();

    try {
    $verifiedIdToken = $auth->verifyIdToken(idToken: $authHeader, leewayInSeconds: 360); // O segundo parâmetro é o tempo de tolerância em segundos para a verificação do token
} catch (FailedToVerifyToken $e) {
    echo 'The token is invalid: '.$e->getMessage();
    echo $authHeader;
}

$uid = $verifiedIdToken->claims()->get('sub');

$userUID = $auth->getUser($uid);



$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
switch ($uri[1]) {
    case 'users':
        require_once 'rotas/Users.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Rota não encontrada']);
        break;
}