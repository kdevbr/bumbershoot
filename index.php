<?php include_once('naoeindex/HF-pages/header.php'); ?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="/naoeindex/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
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
            padding: 5px 10px;
            background-image: linear-gradient(154deg, #fddc56 13%, #f8c91d 23%, #ffc800 24%, #ff9100 75pt);
            color: #3a2101;
            border: ridge rgb(0, 0, 0) 0px;
            border-style: ridge;
            font-size: 14px;
            cursor: pointer;
            opacity: 0;
            transform: translateY(70px);
            transition: opacity 2s, transform 0.5s;
            border-radius: 2px;
            letter-spacing: 1px;
            font-family: "Lucida Console", Monaco, monospace;
            font-size: 20px;
            box-shadow: inset 0 0 0 0 #7c5b0079, -1.5px -1.5px 2px .9px rgb(255, 255, 255), 2px 3px 2px 0px rgb(0, 0, 0);
            -webkit-transition: ease-out 22s;
            -moz-transition: ease-out 22s;
            transition: ease-out 0.4s;
            font-weight: bolder;
            min-height: 60px;
            min-width: 195px;
        }
        
        .slide_diagonal:hover {
            box-shadow: inset 400px 20px 0 0 #643602, -1px -1px 1px 1px rgba(255, 255, 255, 0.747), 2px 2px 1px 1px rgb(0, 0, 0);
            color: wheat;
            font-size: 22px;
            transition: box-shadow 1s ease-out, color 0.8s ease-out;
        }
        /* Classe para animar os botões */
        
        .btn-show {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media only screen and (max-width: 768px) {
            .btnn {
                padding: 3px 8px;
                font-size: 10px;
                min-height: 40px;
                min-width: 120px;
                margin-bottom: 15px;
            }
            .slide_diagonal:hover {
                box-shadow: inset 400px 50px 0 0 #8d4c01;
                color: wheat;
                font-size: 12px;
                transition: box-shadow 0.8s ease-out, color 0.2s ease-out;
            }
            .btn-container {
                flex-direction: column;
            }
            #myVideo {
                height: 99vh;
                object-fit: fill;
            }
        }
    </style>
</head>

<body class="bg-body-secondary">

    <div class="position-relative videoInicial">
        <video id="myVideo" src="naoeindex/gifentrada.mp4" class="videoPrnc" muted autoplay></video>

        <div class="btn-container">
            <a href="#mainelemento"><button id="myButton1" class="btnn slide_diagonal">Bozoclicker</button></a>
            <a href="#mainelemento"><button id="myButton2" class="btnn slide_diagonal">Chat</button></a>
            <a href="#mainelemento"><button id="myButton3" class="btnn slide_diagonal">SobreNoizes</button></a>

        </div>
    </div>
    <main>
        <div class="containerMain container" id="mainelemento" data-bs-theme="light">
<h1 class="text-center">Bem-Vindo</h1>
<p>aaaaaaaaaaaaaa</p>
        </div>
    </main>
    <?php include_once('naoeindex/HF-pages/footer.html'); ?>
    <script>
        setTimeout(function() {
            document.getElementById('myButton1').classList.add('btn-show');
            setTimeout(function() {
                document.getElementById('myButton2').classList.add('btn-show');
                setTimeout(function() {
                    document.getElementById('myButton3').classList.add('btn-show');
                }, 300);
            }, 300);
        }, 1800);

        var video = document.getElementById('myVideo');
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="index.js"></script>
</body>

</html>