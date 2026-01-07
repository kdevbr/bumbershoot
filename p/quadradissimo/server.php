<?php

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Server\IoServer;

require __DIR__ . '../../../vendor/autoload.php';

class Chat implements MessageComponentInterface
{
    protected array $clients = [];
    protected array $players = [];

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients[$conn->resourceId] = $conn;

        $conn->send(json_encode([
            "type" => "START",
            "id" => $conn->resourceId
        ]));
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
$passosbemlentos = json_decode($msg, true);

        if ($passosbemlentos['type'] === 'state') {

                    $this->players[$passosbemlentos["id"]] = [
                    "x" => $passosbemlentos["player"]["x"],
                    "y" => $passosbemlentos["player"]["y"],
                    "nome" => $passosbemlentos["player"]["nome"],
                    "id" => $passosbemlentos["player"]["id"]
                ];
                
            }
            $filteredPlayers = array_filter($this->players, function ($player) use ($from) {
                return $player['id'] !== $from->resourceId;
            });

            $this->clients[$from->resourceId]->send(json_encode([
                "type" => "UPDATE",
                "players" => $filteredPlayers
            ]));
        }
    

    public function onClose(ConnectionInterface $conn)
    {
        unset($this->clients[$conn->resourceId]);
        echo "Conexão fechada: {$conn->resourceId}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
            echo "Erro: {$e->getMessage()}\n";
            $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();
