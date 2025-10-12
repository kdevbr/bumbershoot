<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $username;
    public $nome;
    public $email;
    public $created_at;

    public $imgUri;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (username, email, nome, imgUri, uid) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssss", $this->username, $this->email, $this->nome, $this->imgUri, $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function verificarUsuario() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $this->email);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return true; // Usuário já existe
        }
        return false; // Usuário não existe
    }
        public function verificarUsername() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $this->username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            http_response_code(409);
            return (["existe"=>true]); // Usuário já existe
        }
        return (["existe"=>false]); // Usuário não existe
    }
    public function getAllUsers() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}