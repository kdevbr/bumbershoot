<?php
 require __DIR__ . '/../vendor/autoload.php';

  $options = array(
    'cluster' => 'sa1',
    'useTLS' => true
  );
  $pusher = new Pusher\Pusher(
    '44b4d3f9ece01dfa8fb6',
    '1f3618851d79f86007ee',
    '1952164',
    $options
  );

$pusher->trigger('presence-geraldo', 'zap', array('message' => $_POST['msg'], 'username' => $_POST['username']));

?>