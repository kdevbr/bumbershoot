<?php
//verifica se essa porra tem barra e tira esse merda de barra do caralho

?>

<!doctype html>
<html lang="en">

<head>
    <base href="/" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="/naoeindex/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
    <style>
        #myVideo {
            width: 100%;
            height: auto;
            margin: 0;
        }

        /* Estilo do contêiner de botões */

        .btn-container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* Estilo do botão */

        .btnn {
    margin: 0 20px;
    padding: 15px 25px;
    background-color: #ffc800;
    color: #3a2101;
    border: none;
    font-size: 30px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(400px);
    transition: opacity 0.3s, transform 0.4s, font-size 0.3s, box-shadow .6s ease-out, color 1s ease-out;
    border-radius: 4px;
    font-family: cursive;
    font-weight: bold;
    min-height: 50px;
    min-width: 150px;
}

        .slide_diagonal:hover {
            box-shadow: inset 400px 20px 0 0 #643602;
            color:wheat;
            font-size: 35px;
            transition: box-shadow 1.4s ease-out, color 1.5s ease-out, font-size .1s ease-out;
        }

        /* Classe para animar os botões */

        .btn-show {
            opacity: 1;
            transform: translateY(0);
        }

        .videoInicial {
            transition: margin-top 1s cubic-bezier(0.68, -0.55, 0.27, 1.55), height 0.5s ease-in-out, opacity 0.5s ease-in-out;
            overflow: hidden;
        }

        .videoInicial.show {
            margin-top: 0 !important;
            height: auto;
            opacity: 1;
        }


        @media only screen and (max-width: 768px) {
            .btnn {
                font-size:20px;
                font-weight: 100;
                margin-bottom: 15px;
                min-height: 25px;
                min-width: 75px;
                letter-spacing: 1px;
            }

            .slide_diagonal:hover {
                box-shadow: inset 400px 50px 0 0 #8d4c01;
                color: wheat;
                font-size: 12px;
                transition: box-shadow 0.8s ease-out, color 0.2s ease-out;
            }

            .btn-container {
                flex-direction: column;
                top: 40%;
            }

            #myVideo {
                height: 99vh;
                object-fit: fill;
            }
        }
    </style>
</head>

<body class="bg-dark">
    <img src="lodin.gif" alt="" id="gifLogin">
    <div id="conteudoTotal">
        <?php include_once('naoeindex/HF-pages/header.php'); ?>
        <div class="position-relative videoInicial">
            <!-- <video id="myVideo" src="naoeindex/gifentrada.mp4" class="videoPrnc" muted autoplay></video> -->
            <video id="myVideo" src="naoeindex/imgvid/Gifentrada.mp4" class="videoPrnc" muted autoplay></video>

            <div class="btn-container">
            </div>
        </div>
        <main>
            <div class="containerMain container" id="mainelemento" data-bs-theme="light">
                <div class="CabecaContainerMain"></div>
            </div>
        </main>
        <?php //include_once ('naoeindex/HF-pages/footer.html'); ?>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        setTimeout(function () {
            document.getElementById('myButton1').classList.add('btn-show');
            setTimeout(function () {
                document.getElementById('myButton2').classList.add('btn-show');
                setTimeout(function () {
                    document.getElementById('myButton3').classList.add('btn-show');
                }, 300);
            }, 300);
        }, 1800);
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="index.js"></script>
</body>

</html>