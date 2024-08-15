<?php
//session_start();
/*if($_SESSION['ADMAUTORIZADO'] == 0){
    if($_GET['senha'] == 'nsei'){
        $_SESSION['ADMAUTORIZADO'] = 1;
        header('Refresh:0');
    }else{
        $_SESSION['ADMAUTORIZADO'] = 0;
        header('location: index.php');
    }
    exit();
}
//$_SESSION['logade'] = true;
//$_SESSION['userId'] = $Usuario['id'];
//$_SESSION['poder'] = $Usuario['poder'];
*/
if (!isset($_SESSION['logade'])) {
    exit('Faca login para continuar');
}
if (!$_SESSION['poder'] > 100) {
    exit('voce nao tem privilegios sulficientes');
}
?>
<!DOCTYPE html>
<html lang="pt-br" data-bs-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="/naoeindex/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
    <link rel="stylesheet" href="../index.css">
</head>

<body class="bg-dark h-100">

    <div class="modal fade" id="ModalInfoUsers" tabindex="-1" aria-labelledby="userModalTitulo" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="userModalTitulo">User Information</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3 LinkJanela">
                        <span class="input-group-text" id="basic-addon1">Link da janela:</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                            aria-describedby="basic-addon1" disabled>
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Copy Link <i class="bi bi-clipboard-minus"></i></button>
                    </div>
                    <div class="overflow-x-auto tabelaModalUsers">
                        <table class="table table-striped table-dark">
                            <thead>
                                <tr id="idTRListaDeUsuariosModal">
                                    <th scope="col">#</th>
                                    <th scope="col">Info</th>
                                </tr>
                            </thead>
                            <tbody id="idTbodyListaDeUsuariosModal">
                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <?php include_once ('../naoeindex/HF-pages/header.php'); ?>
    <div class="mainAdm">
        <div class="sideEsq SidLateraisMainAdm">
            <h4 class="text-center text-bg-info fst-italic m-0">Lista de Usuarios</h4>
            <form class="d-flex my-2 mx-1" role="search">
                <input class="form-control me-2" type="search" placeholder="@username, #id"
                    oninput="AtualizaListaDeUsuarios(this.value)" aria-label="Search">
            </form>
            <div class="tablete">
                <table class="table table-striped table-dark m-0">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Info</th>
                        </tr>
                    </thead>
                    <tbody id="idTbodyListaDeUsuarios">
                    </tbody>
                </table>
            </div>
        </div>
        <div class="MeioAdm">
            <div class="imagdefundo"></div>
            <div class="imagemContainer">
                <img src="nos.jpg" id="imgDosAdm" alt="" srcset="">
                <span id="adm1" class="textImagemAdmContainer">sexoforte</span>
                <span id="adm2" class="textImagemAdmContainer">BergÃ³lios prepucios </span>
                <span id="adm3" class="textImagemAdmContainer">Link</span>
                <span id="centroadm1" class="textImagemAdmContainer">BUMBERSHOOT</span>
            </div>
            <div class="ListaDosAdms my-4" id="ListaDosAdmsId">
            </div>

            <div class="PapelDeParede">
                <div class="selecionadoPapelDeParede position-relative">
                    <img id="imgAtualFundo" class="ItenPapel"></img>
                    <h5 class="position-absolute text-bg-warning m-0" style="top: 5px;">Imagem Atual</h5>
                    <buttom type="file" onclick="$('#InputFileFundoAdm').click();"
                        class="btn btn-outline-light position-absolute" style="bottom: 15px;">Upload!!</buttom>
                    <input type="file" id="InputFileFundoAdm" style="display: none;" name="" accept="image/*" id="">
                </div>
                <div class="ItensDoPapelDeParede position-relative">
                    <h4 class="position-absolute text-light m-0" style="bottom: 5px; left: 10px;">Clique na imagem para
                        selecionar, voce pode enviar imagens ao lado</h4>
                    <div id="ContainerItenDosPapel"></div>
                </div>
            </div>

            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        </div>
        <div class="sideDir SidLateraisMainAdm">
            <h4 class="text-center text-bg-info fst-italic m-0">Lista de paginas</h4>
        </div>
    </div>
</body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="index.js"></script>


</html>