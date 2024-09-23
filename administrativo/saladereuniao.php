<?php

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
    <title>Reuniao</title>
    <link href="/naoeindex/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
    <link rel="stylesheet" href="../index.css">
    <style type="text/css">
    body { 
        cursor: url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAFAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAFAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAwAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP///////////////////////////////////////////wAAAP8AAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAADAAAA////////////////////////////////////////////AAAA/wAAAAMAAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAwAAAP//////////////////////////////////////////////////////AAAA/wAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAKAAAA//////////////////////////////////////////////////////8AAAD/AAAAAwAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAwAAAP///////////////////////////////////////////////////////////wAAAP8AAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADAAAA/////////////////////////////////////////////////////////////////wAAAP8AAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAwAAAP//////////////////////////////////////////////////////////////////////AAAA/wAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADAAAA//////////////////////////////////////////////////////////////////////8AAAD/AAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP///////////wAAAP///////////////////////////////////////////////////////////wAAAP8AAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////AAAA////////////////////////////////////////////////////////////AAAA/wAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAD///////////////////////////////////////////8AAAD///////////8AAAD/AAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAACAAAAP///////////wAAAP///////////wAAAP///////////wAAAP//////AAAA/wAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAA////////////AAAA////////////AAAA////////////AAAA/wAAAP8AAAAPAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD///////////8AAAD/AAAA/wAAAP8AAAADAAAABgAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP///////////wAAAP8AAAADAAAAAwAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAA/wAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD/AAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAADAAAAAwAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAA/wAAABUAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAADAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////////////////////////////////////////4Af//+AH///gB///wAP//8AD//+AA///gAH//wAB//8AAf/+AAH//AAB//wAAf/8QAP//8AH///AH///4H////h////4f///+H////h////8///8='), pointer;
         }</style>
    
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
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Copy Link <i
                                class="bi bi-clipboard-minus"></i></button>
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

    <div class="modal fade" id="ModalNovaPagina" tabindex="-1" aria-labelledby="userModalTitulo" style="z-index: 3000;"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="userModalTitulo">User Information</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="FormCriarPagina">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nome da pagina:</label>
                            <input type="email" class="form-control" name="pageName" id="exampleInputEmail1"
                                aria-describedby="emailHelp">
                            <div id="emailHelp" class="form-text">Digite o nome</div>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Sim ou nao</label>
                        </div>
                        <br>
                        <label for="customRange1" class="form-label"> o quanto vc é gay</label>
                        <input type="range" class="form-range" id="customRange1">

                        <div class="mb-3">
                            <label for="validationTextarea" class="form-label">Informações sobre a Página</label>
                            <textarea class="form-control" id="validationTextarea"
                                placeholder="Qual é o objetivo da Página" name="pageInfo" required></textarea>
                            <div class="invalid-feedback">
                                Preencha o espaço
                            </div>
                        </div>

                        <div class="form-check">
                            <input type="radio" name="pageInicioS" class="form-check-input" id="validationFormCheck2" name="radio-stacked"
                                required>
                            <label class="form-check-label" for="validationFormCheck2">Adicionar Página ao
                                início</label>
                        </div>
                        <div class="form-check mb-3">
                            <input type="radio" name="pageInicioN" class="form-check-input" id="validationFormCheck3" name="radio-stacked"
                                required>
                            <label class="form-check-label" for="validationFormCheck3">Não exibir Página no
                                início</label>
                            <div class="invalid-feedback">Preencha o espaço</div>
                        </div>

                        <div class="mb-3">
                            <select class="form-select" required aria-label="select example" name="pageInicioSelect" id="menuSelecao" disabled>
                                <option value="">Menu de seleçäo</option>
                                <option value="1">Primeiro</option>
                                <option value="2">Segundo</option>
                                <option value="3">Terceiro</option>
                            </select>
                            <div class="invalid-feedback">Example invalid select feedback</div>
                        </div>

                        <div class="mb-3">
                            <input type="file" class="form-control" name="pageFile" aria-label="file example" required>
                            <div class="invalid-feedback">Example invalid form file feedback</div>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">

                    <button class="btn btn-primary" onclick="EnviarFormPagina()">Enviar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <?php include_once('../naoeindex/HF-pages/header.php'); ?>
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