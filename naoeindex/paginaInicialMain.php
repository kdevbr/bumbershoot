<?php
include_once('bd.php');
$res = $conn->query("SELECT * FROM `paginas`");
?>
<div class="CabecaContainerMain">
    <div class='text-light py-2 d-flex justify-content-between h-100 flex-wrap'>
        <div id="TituloMain" class="AnimaMainEntradaText ladoEsquedoHeadMainConteudo ms-3">
            <h1 class=''>Bumbershoot</h1>
            <h5 class='AutorMain'>Ultima Atualizaçao:<span class="text-warning"> 1945/12/11</span></h5>
        </div>
    </div>
</div>
<div class='CorpoContainerMainI text-white h-auto w-100 m-1'>
    <p class="text-center m-0">Nossos sites :D</p>
    <div class="d-flex flex-wrap mx-3 my-1" style="gap: 20px;">

        <?php if ($res->num_rows > 0) {
            while ($row = $res->fetch_assoc()) { ?>
                <div class="caixa d-flex align-items-center justify-content-center flex-fill" onclick="BotoesInicial('<?php echo $row['linkURL']; ?>')">
                    <?php echo $row['titulo']; ?>
                </div>
            <?php }
        } ?>

    </div>
</div>