<?php
class Usuario
{
    public function login($user, $senha)
    {
        unset($_SESSION['logade']);

        global $conn;

        if (!$conn || $conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $q = $conn->prepare("SELECT * FROM usuarios WHERE username = ?");
        $q->bind_param("s", $user);
        $q->execute();

        $res = $q->get_result();

        if ($res->num_rows > 0) {
            $Usuario = $res->fetch_assoc();

            if ($Usuario['password'] == $senha) {

                $_SESSION['logade'] = 1;
                $_SESSION['userId'] = $Usuario['id'];
                $_SESSION['poder'] = $Usuario['poder'];

                $token = bin2hex(random_bytes(16));
                setcookie('lembrarDeMim' , $token, time() + (86400 * 30),'/' , '', false ,true);

                $q = $conn->prepare("UPDATE usuarios SET token = ? WHERE id = ?");
                $q->bind_param("si", $token, $Usuario['id']);
                $q->execute();

                //$q->close();
                //$conn->close();
                return 0;
            } else {
                //$q->close();
                //$conn->close();
                return 2;
                //senha invalida
            }
        } else {

            return 1;
            //usuario nao encontrado
        }

    }
    public function PegarDados()
    {
        if (isset($_SESSION['logade'])) {

            global $conn;

            $q = $conn->prepare("SELECT id, username, icon, cor, poder FROM usuarios WHERE id = ?");
            $q->bind_param("s", $_SESSION['userId']);
            $q->execute();

            $res = $q->get_result();

            if ($res->num_rows > 0) {
                $Usuario = $res->fetch_assoc();

                echo json_encode(["Dados" => $Usuario, "Codigo" => 3]);

            }
        } elseif(isset($_COOKIE['lembrarDeMim'])) {
            $token = $_COOKIE['lembrarDeMim'];

            $query = $conn->prepare("SELECT id, username, icon, cor, poder FROM users WHERE token = ?");
            $query->bind_param('s', $token);
            $query->execute();
            $result = $query->get_result();
            $user = $result->fetch_assoc();
        
            if ($user) {
                $_SESSION['logade'] = 1;
                $_SESSION['userId'] = $user['id'];
                $_SESSION['poder'] = $user['poder'];

                echo json_encode(["Dados" => $user, "Codigo" => 3]);

            } else {
                setcookie('lembrarDeMim', '', time() - 3600, "/");
            }
        }else{
            echo json_encode(["Codigo" => 0]);
        }

    }
    public function registro($user, $senha)
    {
        global $conn;

        $q = $conn->prepare("SELECT * FROM usuarios WHERE username = ?");
        $q->bind_param("s", $user);
        $q->execute();

        $res = $q->get_result();
        print_r($res->fetch_all());
        if ($res->num_rows > 0) {
            $q->close();
            $conn->close();
            return 1;
            //usuario ja resgistrado
        } else {

            $q = $conn->prepare("INSERT INTO usuarios (username, password) VALUES (?, ?)");
            $q->bind_param("ss", $user, $senha);
            
            if ($q->execute()) {
                return 0;
                //usuario registrado
            } else{
                $q->close();
                $conn->close();
                return 2;
                //erro ao registrar 
            }
        }
    }

}
