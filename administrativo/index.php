<?php 
session_start();
if(!isset($_SESSION['ADMAUTORIZADO'])){$_SESSION['ADMAUTORIZADO']=null;}

//print_r($_SESSION);
if(isset($_GET['senha'])){
    $senha = $_GET['senha'];
}else{
    $senha = 'logado';
}
    //echo 'code:'.$senha;
    //echo 'code:'.$_SESSION['ADMAUTORIZADO'];
    if($_SESSION['ADMAUTORIZADO'] == 0){
        if($senha == 'nsei'){
            $_SESSION['ADMAUTORIZADO'] = $senha;
            header('location:/administrativo');
        }
    }else{
        switch($_SESSION['ADMAUTORIZADO']){
            case 'nsei':
                $urlbarra = 'reuniao';
                include 'saladereuniao.php';
            break;
        }
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <center>
        <img src="mbcomum.jpg" alt="" height="300px">
        <h2>Apenas admiros</h2>
    </center>
    <script>
        history.pushState({}, "", '../../administrativo');
        var autorizado = false
        <?php if($_SESSION['ADMAUTORIZADO'] == 1){ ?>
            autorizado = true;
            window.open('administrativo', '_self')
        <?php };?>
            if(autorizado == false){
                var senha = window.prompt('qual é a senha porra') 
            }
            setTimeout(()=>{
                window.open('administrativo?senha='+senha, '_self')
            },2000)
            </script>

</body>
</html>