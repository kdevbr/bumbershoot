<?php include_once('form.html'); ?>

<nav class="navbar position-fixed w-100 top-0 navInicial" id="navInicial" style="" data-bs-theme="dark">
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

    <div class="me-2">
        <button data-bs-toggle="modal" data-bs-target="#ModalLogin"
            class="btn btn-outline-light border-0 rounded-0 fw-bold" id="BtnHeaderLoginRegistro" style="display: none;"
            type="button">Login & Register</button>

        <!-- Example split danger button -->
        <div id="DropLogados" class="btn-group">
            <a id="BtnDesconecta" href="" class="btn btn-outline-light border-0 rounded-0 fw-bold  "
                style="display: none;">Usuario: <span class="nomeUser fw-bold"></span></a>
            <button type="button" id=""
                class="btn btn-outline-light dropdown-toggle border-0 ms-1 border-black rounded-0 dropdown-toggle-split"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu rounded-0" style="transform: translateX(-19%);">
                <li><button class="dropdown-item" onclick="alert('15')" href="#">7+8</button></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="/desconectar">Sair <i style="vertical-align: -1px;"
                            class="bi bi-box-arrow-right"></i></a></li>
            </ul>
        </div>



    </div>
</nav>