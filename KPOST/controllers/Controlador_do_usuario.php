<?php

require_once 'modelos/User.php';

class UserController
{
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
    }
    public function index()
    {
        $user = new User($this->conn);
        $users = $user->getAllUsers();
        $result = $users->get_result();
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    }

    public function show($id)
    {
        // Show a single user by ID
    }
public function verifyUser(){
    global $userUID;
    $user = new User($this->conn);
    $user->email = $userUID->email;
    echo json_encode(["existe" => $user->verificarUsuario()]);
}
public function verifyUsername(){
    global $userUID;
    $user = new User($this->conn);
    $user->username = $_POST['username'];
    echo json_encode($user->verificarUsername());
}
    public function create()
    {
        global $userUID;
        $user = new User($this->conn);
        $user->username = $_POST['username'];
        $user->nome = $_POST['nome'];
        $user->email = $userUID->email;
        $user->id = $userUID->uid;
        $user->imgUri = $userUID->photoUrl;

        if ($user->verificarUsuario()== true) {
            http_response_code(400);
            echo json_encode(['error' => 'Usuário já existe']);
        } else {
            if ($user->create()) {
                echo json_encode(['status' => 'Usuário criado com sucesso']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Erro ao criar usuário']);
            }
        }
    }

    public function store($data)
    {
        // Save a new user
    }

    public function edit($id)
    {
        // Show form to edit user
    }

    public function update($id, $data)
    {
        // Update user data
    }

    public function destroy($id)
    {
        // Delete a user
    }
}