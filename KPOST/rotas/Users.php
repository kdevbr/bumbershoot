<?php

require_once 'config/db.php';
require_once 'controllers/Controlador_do_usuario.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$id = null;
$db = (new Database())->getConnection();
$controller = new UserController($db);
switch ($method) {
    case 'GET':
        if (isset($uri[2])) {
        if($uri[2] == "check"){
            // Verificar se o usuário já existe
            $controller->verifyUser();
        }
        } else {
            // Listar todos os usuários
            $controller->index();
        }
        break;

    case 'POST':
        if (isset($uri[2]) && $uri[2] === 'checkusername') {
            // Criar um novo usuário
             $controller->verifyUsername();
        }else{
            $controller->create();
        }
        break;

    case 'PUT':
        if ($id === null) {
            http_response_code(400);
            echo json_encode(['error' => 'ID não informado']);
            break;
        }
        // Atualizar usuário
        $body = json_decode(file_get_contents('php://input'), true);
        // Atualizar usuário no banco de dados
        echo json_encode(['status' => 'Usuário atualizado']);
        break;

    case 'DELETE':
        if ($id === null) {
            http_response_code(400);
            echo json_encode(['error' => 'ID não informado']);
            break;
        }
        // Remover usuário do banco de dados
        echo json_encode(['status' => 'Usuário deletado']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        break;
}