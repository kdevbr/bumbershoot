<?php
include_once ('bd.php');

echo "Conectado ao banco de dados: ";
if (isset($_POST['DadosBruto'])) {
    $dadosEsp = $_POST['DadosBruto'];
    $dadosArray = explode(',', $dadosEsp);
    //echo $dadosArray[0];
    //echo $dadosArray[1];

    $data_atual = date('Y-m-d H:i:s');
    $umi = $dadosArray[0];
    $chuv = $dadosArray[1];

    if ($conn->query("INSERT INTO `dados_segundos`(`data`, `Umidade`, `Chuva`) VALUES ('$data_atual', '$umi', '$chuv')")) {
        echo "Dados Salvos no banco de dados, Atualize para visualizar";

        // Data atual sem hora
        $data_atual_dia = date('Y-m-d');

        $check_sql = "SELECT * FROM `medias_diarias` WHERE `data` = '$data_atual_dia'";
        $result = $conn->query($check_sql);

        if ($result->num_rows > 0) {
            // Atualizar a entrada diária existente
            $update_sql = "
            UPDATE `medias_diarias`
            SET 
                `Umidade` = (SELECT AVG(`Umidade`) FROM `dados_segundos` WHERE DATE(`data`) = '$data_atual_dia'),
                `Chuva` = (SELECT SUM(`Chuva`) FROM `dados_segundos` WHERE DATE(`data`) = '$data_atual_dia')
            WHERE `data` = '$data_atual_dia'
        ";
            if ($conn->query($update_sql) === TRUE) {
                echo "Dados diários atualizados com sucesso.<br>";
            } else {
                echo "Erro ao atualizar dados diários: " . $conn->error . "<br>";
            }
        } else {
            // Inserir uma nova entrada diária
            $insert_diario_sql = "
            INSERT INTO `medias_diarias` (`data`, `Umidade`, `Chuva`) 
            VALUES (
                '$data_atual_dia', 
                (SELECT AVG(`Umidade`) FROM `dados_segundos` WHERE DATE(`data`) = '$data_atual_dia'), 
                (SELECT SUM(`Chuva`) FROM `dados_segundos` WHERE DATE(`data`) = '$data_atual_dia')
            )
        ";
            if ($conn->query($insert_diario_sql) === TRUE) {
                echo "Dados diários salvos com sucesso.<br>";
            } else {
                echo "Erro ao salvar dados diários: " . $conn->error . "<br>";
            }
        }
    }
} 
/*
else {
    // Mostrar todos os dados em forma de lista
    $sql = "SELECT * FROM dados_segundos";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Criar uma tabela HTML para exibir os dados
        echo "<table border='1'>";
        echo "<tr><th>ID</th><th>Data</th><th>Umidade</th><th>Chuva</th></tr>";
        // Percorrer e exibir os dados
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['id'] . "</td>";
            echo "<td>" . $row['data'] . "</td>";
            echo "<td>" . $row['Umidade'] . "%</td>";
            echo "<td>" . ($row['Chuva'] == 1 ? 'Sim' : 'Nao') . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "Nenhum dado encontrado.";
    }

    $conn->close();
}
*/

?>