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
        $this->players[$conn->resourceId] = [
            "attributos" => [
                'x' => rand(0, 800),
                'y' => rand(0, 600),
                'speed' => 300,
                'nome' => null,
                'hp' => 100
            ],
            "id" => $conn->resourceId,
            "teclasPrecionadas" => null
            ];
        $conn->send(json_encode([
            "type" => "START",
            "id" => $conn->resourceId
        ]));

        echo "Nova conexão: {$conn->resourceId}\n";
    }

    public function onMessage(ConnectionInterface $conn, $msg)
    {
        $data = json_decode($msg, true);

        if ($data['type'] === 'state') {

            $this->players[$conn->resourceId]["teclasPrecionadas"] = $data['key'];
        }
    }

    public function gameLoop()
    {
        //echo "Tick - Players ativos: " . count($this->players) . "\n";
        
        if (empty($this->clients)) return;

foreach ($this->players as $id => &$player) {
            if (isset($player['teclasPrecionadas'])) {
                $keys = $player['teclasPrecionadas'];
                $speed = $player['attributos']['speed'] * 0.05; // Ajusta a velocidade com base no tempo do loop

if (!empty($keys['w'])) {
    $player['attributos']['y'] -= $speed;
}
if (!empty($keys['s'])) {
    $player['attributos']['y'] += $speed;
}
if (!empty($keys['a'])) {
    $player['attributos']['x'] -= $speed;
}
if (!empty($keys['d'])) {
    $player['attributos']['x'] += $speed;
}
            }
        }

        foreach ($this->clients as $client) {

            $client->send(json_encode([
                "type" => "UPDATE",
                "players" => array_values($this->players)
            ]));
        }

        if(isset($this->players)){
            // Limpa o array de players após enviar os dados
            //print_r($this->players);
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
$loop->addPeriodicTimer(0.01, function() use ($chat) {
    $chat->gameLoop();
});

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