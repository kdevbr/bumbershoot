<?php
session_start();
echo $_SESSION['logade'] ?? 0;
session_write_close();
?>