<?php
class Database {
    private $host = 'localhost';
    private $user = 'root';
    private $pass = '';
    private $db   = 'kpost';
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->db);

        if ($this->conn->connect_error) {
            die("Falha na conexão: " . $this->conn->connect_error);
        }
        $this->conn->set_charset("utf8mb4");
        
    }
    public function getConnection() {
        return $this->conn;
    }
}
