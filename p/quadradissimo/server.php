<?php

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Server\IoServer;
use React\EventLoop\Loop;
use React\Socket\SocketServer;

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

        echo "Nova conexão: {$conn->resourceId}\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg, true);

        if ($data['type'] === 'state') {
            $this->players[$data["id"]] = [
                "x" => $data["player"]["x"],
                "y" => $data["player"]["y"],
                "nome" => $data["player"]["nome"],
                "id" => $data["player"]["id"],
                "s" => 3
            ];
        }
    }

    public function gameLoop()
    {
        echo "Tick - Players ativos: " . count($this->players) . "\n";
        
        if (empty($this->clients)) return;

        foreach ($this->clients as $client) {
            $filteredPlayers = array_filter($this->players, function ($player) use ($client) {
                return $player['id'] !== $client->resourceId;
            });

            $client->send(json_encode([
                "type" => "UPDATE",
                "players" => array_values($filteredPlayers)
            ]));
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        unset($this->clients[$conn->resourceId]);
        unset($this->players[$conn->resourceId]);
        echo "Conexão fechada: {$conn->resourceId}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "Erro: {$e->getMessage()}\n";
        $conn->close();
    }
}

// Cria o loop
$loop = Loop::get();

$chat = new Chat();

// Adiciona o timer ANTES de criar o servidor
$loop->addPeriodicTimer(0.05, function() use ($chat) {
    $chat->gameLoop();
});

// Cria o socket server manualmente com o loop
$socket = new SocketServer('0.0.0.0:8080', [], $loop);

$server = new IoServer(
    new HttpServer(
        new WsServer($chat)
    ),
    $socket,
    $loop
);

echo "Servidor rodando na porta 8080\n";

// Roda o loop
$loop->run();