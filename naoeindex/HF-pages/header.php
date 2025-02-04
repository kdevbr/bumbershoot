<?php include_once('form.html'); ?>

<nav class="navbar position-fixed w-100 top-0 navInicial" style="" data-bs-theme="dark">
    <a class="navbar-brand ms-2 p-1 fs-6 " style="font-family: 'FONTETITOLE';"
        href="https://bumbershoot.com.br/">BumberShoot</a>
    <div class="botoesNav" id="divDosBtnMembroComum">
        <a href="/" class="btn btn-outline-light border-0 rounded-5 fw-bold">Inicio</a>
        <a href="/bozoclicker" class="btn btn-outline-light border-0 rounded-5 fw-bold">Bozoclicker</a>

        <div class="dropdown" id="more-menu">
            <button class="btn btn-outline-light border-0 rounded-5 fw-bold dropdown-toggle" type="button"
                data-bs-toggle="dropdown">
                ...
            </button>
            <ul class="dropdown-menu" id="more-dropdown"></ul>
        </div>
    </div>

    <div class=" me-2">
        <button data-bs-toggle="modal" data-bs-target="#ModalLogin" class="btn btn-outline-light border-0 rounded-0 fw-bold"
            id="BtnHeaderLoginRegistro" style="display: none;" type="button">Login & Register</button>
        <a id="BtnDesconecta" href="/desconectar" class="btn text-bg-primary border-0 rounded-0 fw-bold active mb-1"
            style="display: none;">desconectar</a>
    </div>
</nav>