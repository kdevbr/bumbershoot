<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

include_once("../../naoeindex/bd.php");

header('Content-Type: application/json; charset=utf-8');

try {
    if (!isset($_GET['nivel'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'Parâmetro nível não fornecido.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $nivel = intval($_GET['nivel']);
    $res = $conn->query("SELECT * FROM `cicada2469` WHERE `nivel` = '$nivel'");
    if ($res->num_rows == 0) {
        http_response_code(404);
        echo json_encode(['erro' => 'Nível inválido.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $link = $res->fetch_assoc()['urlPastaNivel'];
    $fullLink = $_SERVER['DOCUMENT_ROOT'] . "/p/cicada2469/" . $link;
    $htmlContent = file_get_contents($fullLink);

    if ($htmlContent === false) {
        throw new RuntimeException("Não foi possível ler o arquivo: {$fullLink}");
    }

    if (preg_match('//u', $htmlContent) !== 1) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_buffer($finfo, $htmlContent);
        finfo_close($finfo);

        if ($mimeType === false) {
            throw new RuntimeException('Não foi possível identificar o tipo do arquivo binário.');
        }

        $conteudo = '<img src="data:' . $mimeType . ';base64,' . base64_encode($htmlContent) . '" alt="Conteúdo do nível">';
    } else {
        $nivelBaseUrl = 'niveis/' . rawurlencode((string) $nivel) . '/';
        $titulo = null;
        if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $htmlContent, $titleMatch)) {
            $titulo = trim(strip_tags($titleMatch[1]));
        }

        $conteudo = preg_replace_callback(
            '/(\b(?:src|poster)\s*=\s*["\'])(?!https?:|\/|data:|#)([^"\']+)(["\'])/iu',
            function ($match) use ($nivelBaseUrl) {
                return $match[1] . $nivelBaseUrl . str_replace('%2F', '/', rawurlencode($match[2])) . $match[3];
            },
            $htmlContent
        );

        if ($conteudo === null) {
            throw new RuntimeException('Não foi possível ajustar os caminhos dos arquivos do nível.');
        }
    }

    $json = json_encode([
        'conteudo' => $conteudo,
        'titulo' => $titulo ?? 'Cicada 2469'
    ], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    echo $json;
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode([
        'erro' => get_class($error),
        'mensagem' => $error->getMessage(),
        'arquivo' => $error->getFile(),
        'linha' => $error->getLine()
    ], JSON_UNESCAPED_UNICODE);
}

//lyncom: 3
//danilo: 1