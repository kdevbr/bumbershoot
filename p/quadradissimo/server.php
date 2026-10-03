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
                'x' => 150,
                'y' => 150,
                'speed' => 100,
                'nome' => null,
                'hp' => 500,
                'maxHp' => 500,
                'tamanho' => 50,
                'lastAttack' => 0
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

        if ($data['type'] === 'attack') {
            $this->processAttack($conn->resourceId);
        }
    }

    private function processAttack(int $attackerId): void
    {
        if (!isset($this->players[$attackerId])) return;

        $attacker = &$this->players[$attackerId];
        $now = microtime(true);
        $lastAttack = $attacker['attributos']['lastAttack'] ?? 0;
        $cooldown = 0.4;

        if (($now - $lastAttack) < $cooldown) return;

        $attacker['attributos']['lastAttack'] = $now;

        $range = 80;
        $damage = 50;
        $attackerSize = $attacker['attributos']['tamanho'];
        $attackerX = $attacker['attributos']['x'] + ($attackerSize / 2);
        $attackerY = $attacker['attributos']['y'] + ($attackerSize / 2);

        foreach ($this->players as $id => &$target) {
            if ($id === $attackerId) continue;

            $targetSize = $target['attributos']['tamanho'];
            $targetX = $target['attributos']['x'];
            $targetY = $target['attributos']['y'];

            $closestX = max($targetX, min($attackerX, $targetX + $targetSize));
            $closestY = max($targetY, min($attackerY, $targetY + $targetSize));
            $dx = $attackerX - $closestX;
            $dy = $attackerY - $closestY;
            $distance = sqrt(($dx * $dx) + ($dy * $dy));

            if ($distance <= $range) {
                $target['attributos']['hp'] = max(0, $target['attributos']['hp'] - $damage);
            }
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

$socket = new SocketServer('127.0.0.1:8080', [], $loop);

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
