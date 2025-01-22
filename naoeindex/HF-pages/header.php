<?php include_once ('form.html'); ?>

<nav class="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 top-0" style="z-index: 2000;" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand fs-6" style="font-family: 'FONTETITOLE';" href="https://bumbershoot.com.br/">BumberShoot</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                <div class="container-fluid justify-content-start my-1 w-auto" id="BtnAdms">
                    <span id="divDosBtnMembroComum">
                        <a href="/" class="btn btn-outline-light border-0 rounded-5 fw-bold" type="button">Início</a>
                        <a href="/bozoclicker" class="btn btn-outline-light border-0 rounded-5 fw-bold" type="button">Bozoclicker</a>
                    </span>
                    <a href="/administrativo" id="BtnPostar" class="btn btn-danger border-2 p-2 px-3 rounded-5 fw-bold" style="box-shadow: inset 0 0 15px rgb(53, 0, 7), 0 0 20px #c0001a; display: none;">Area Administrativa</a>
                </div>
            </ul>
            <div id="DivDosLogadosHeaders">
                <a href="/desconectar" class="btn text-bg-primary border-0 rounded-5 fw-bold active mb-1">desconectar</a>
                <h4 class="mt-3 d-inline-block" style="color: rgb(2 90 255 / 90%); font-family: cmds;">Conectado<i class="bi-lock-fill"></i></h4>
                <p class="d-inline-block text-light-emphasis">bem vindo: <span class="nomeUser"></span></p>
            </div>
            <button data-bs-toggle="modal" data-bs-target="#ModalLogin" class="btn btn-outline-light border-0 rounded-5 fw-bold" id="BtnHeaderLoginRegistro" type="button">Login & Register</button>
        </div>
    </div>
</nav>