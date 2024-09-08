var MensagensDeLogin = ['Erro tente novamente', 'Usuario Não Foi encontrado', 'Senha invalida', 'Sucesso']
var MensagensDeRegistrgo = ['Erro tente novamente', 'Usuario ja resgistrado', 'Erro ao registrar', 'Sucesso']
var DadosUser;
var LogadoSimOuNao;

var Divs = {
    TextoLoginEregistro: $('#BtnHeaderLoginRegistro'),
    HeadersLogados: $('#DivDosLogadosHeaders'),
    Btn: {
        BtnDosAdmiro: {
            BtnPostarPagina: $('#BtnPostar')
        }
    },
    Texto: {}
}

$('#conteudoTotal').hide();
$('#DivDosLogadosHeaders').hide();

$(window).on("load", function() {

    $('#gifLogin').hide();
    $('#conteudoTotal').show();

    var data = {
        tipo: 'veri'
    };

    $.ajax({
        type: 'POST',
        url: 'naoeindex/SistemaLogin/login.php',
        data: data,
        dataType: 'json',
        async: false,
        success: function(response) {
            if (response.Codigo == 3) {
                DadosUser = response.Dados
                    //window.open('../', '_self');
                LogadoSimOuNao = true
            } else {
                LogadoSimOuNao = false
            }
        },
        error: function(error) {
            console.log('Erro na requisição AJAX:', error);
        }
    })

    loadContent(window.location.pathname);
    EstasLogado();
});
if (window.location.pathname == '/') {

}

//CodigosDeMensagensDeLogin

var deleizinhone1

function EstasLogado() {
    if (LogadoSimOuNao) {
        if (DadosUser.poder > 99) {
            Divs.Btn.BtnDosAdmiro.BtnPostarPagina.show();
        }
        Divs.TextoLoginEregistro.hide();
        Divs.HeadersLogados.show();

        document.querySelectorAll('.nomeUser').forEach((x) => {
            x.innerHTML = DadosUser.username;
        })
    }

}

function loadContent(path) {

    let TituloMain = $('#TituloMain');
    let AutorMain = $('#AutorMain');

    const contentDiv = $("#mainelemento");
    //alert(path)
    // Verifica qual seção deve ser carregada com base na URL
    if (path == "/") {
        let TituloMain = $('#TituloMain');
        $('.videoInicial').removeClass('hide').addClass('show');
        TituloMain.toggleClass('AnimaMainEntradaText');
        TituloMain.toggleClass('AnimaMainSaidaText');

        setTimeout(() => {
            contentDiv.load('naoeindex/paginaInicialMain.html')
        }, 800)
        deleizinhone1 = setTimeout(() => {
            //$('main').hide();
        }, 800)
    } else {
        clearTimeout(deleizinhone1);
        $('.videoInicial').removeClass('show').addClass('hide');
        //document.querySelector('.videoInicial').style.marginTop = `-${document.querySelector('.videoInicial').clientHeight}px`;
        $('main').show();
        $.ajax({
            url: 'naoeindex/carregaConteudo.php',
            method: 'GET',
            data: { page: path },
            dataType: 'json',
            success: function(response) {
                if (response.Refrache) {
                    window.open('../', "_self");
                }
                if (response.ADM) {
                    window.location.reload();
                }



                TituloMain.toggleClass('AnimaMainEntradaText');
                TituloMain.toggleClass('AnimaMainSaidaText');

                setTimeout(() => {

                    contentDiv.html(`
                        <div class="CabecaContainerMain">
        <div class='text-light my-2 d-flex justify-content-between h-100 flex-wrap'>
            <div id="TituloMain" class="AnimaMainEntradaText ladoEsquedoHeadMainConteudo ms-3">
                <h1 id="TituloMain" >${response.titulo}</h1>
                <h5 class=''>Publicado por: ${response.autor}</h5>
            </div>
            <div class="ladoDireitoHeadMainConteudo me-3 mt-1 col-12 col-sm-2">
                <h6 class='text-center'>Postado:<br>${response.data}</h6>
            </div>
        </div>
    </div>
    <p class='text-center position-absolute text-white' style="top: 130px;">Conteudo: ${response.conteudo}</p>
                        `);

                    setTimeout(() => {
                        TituloMain.toggleClass('AnimaMainEntradaText');
                    }, 1000)
                }, 1000)
            },
            error: function(e) {
                contentDiv.html("<h2>Erro</h2><p>correu um erro ao carregar a página.</p>");
            }
        });
    }

    document.querySelectorAll("nav a").forEach(function(link) {
        if (link.getAttribute("href") == window.location.pathname) {
            link.classList.add('active')
        } else {
            link.classList.remove('active')
        }
    });

}



// Carregar o conteúdo inicial com base na URL atual

document.querySelectorAll("nav a").forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const path = this.getAttribute("href");
        history.pushState({}, "", path);
        loadContent(path);
    });
});

// Atualizar o conteúdo quando a navegação de volta ou avanço é acionada
window.addEventListener("popstate", function() {
    loadContent(window.location.pathname);
});


//codigos de login
//LOGIN:
function LoginPass() {
    var InputPassLogin = document.getElementById('PassLoginForm')
    var InputPassMsg = document.getElementById('msgPassLogin')
    let valido = InputPassLogin.value.length > 7

    InputPassMsg.className = valido ? 'valid-feedback d-block' : 'invalid-feedback d-block'
    InputPassLogin.className = valido ? 'form-control is-valid' : 'form-control is-invalid'


    InputPassMsg.innerHTML = valido ? 'OK!' : `Precisa ter 8 ou mais caracteres: ${InputPassLogin.value.length}`;

    return valido
}

$('#LoginForm').on('submit', function(e) {
        e.preventDefault();
        document.getElementById('msgPassLogin').innerHTML = '';

        if (LoginPass()) {
            var data = {
                user: $('#UserLoginForm').val(),
                pass: $('#PassLoginForm').val(),
                tipo: 'login'
            };

            $.ajax({
                type: 'POST',
                url: 'naoeindex/SistemaLogin/login.php',
                data: data,
                dataType: 'json',
                success: function(response) {
                    if (response.Codigo == 3) {
                        DadosUser = response.Dados
                            //window.open('../', '_self');
                        valido = true
                        $('#ModalLogin').modal('hide');
                    } else {
                        valido = false
                    }
                    document.getElementById('msgPassLogin').className = valido ? 'valid-feedback d-block' : 'invalid-feedback d-block'
                    document.getElementById('PassLoginForm').className = valido ? 'form-control is-valid' : 'form-control is-invalid'
                    document.getElementById('UserLoginForm').className = valido ? 'form-control is-valid' : 'form-control is-invalid'

                    document.getElementById('msgPassLogin').innerHTML = MensagensDeLogin[response.Codigo]
                    $('#msgPassLogin').addClass('pulsar');
                    setTimeout(function() {
                        $('#msgPassLogin').removeClass('pulsar');
                    }, 500);
                    LogadoSimOuNao = valido;
                    EstasLogado();
                },
                error: function(error) {
                    console.log('Erro na requisição AJAX:', error);
                }
            })
        } else {
            e.preventDefault();
            $('#msgPassLogin').addClass('pulsar');
            setTimeout(function() {
                $('#msgPassLogin').removeClass('pulsar');
            }, 500);
        }
    })
    //REGISTRO:
let deleizinhone;
let nome_de_usuario_ok = false;
let nome_de_usuario_maior_que_3 = false;

function RegistroUser() {

    let InputUserRegistro = document.getElementById('RegistroInputUser')
    let InputUserMsg = document.getElementById('msgUserRegistro')
    let valido = InputUserRegistro.value.length > 2
    clearTimeout(deleizinhone)
    InputUserMsg.className = valido ? 'valid-feedback d-block' : 'invalid-feedback d-block'
    InputUserRegistro.className = valido ? 'form-control is-valid' : 'form-control is-invalid'
    InputUserMsg.innerHTML = !valido ? `Precisa ter 3 ou mais caracteres: ${InputUserRegistro.value.length}` : '';
    if (valido) {
        nome_de_usuario_maior_que_3 = valido
        deleizinhone = setTimeout(() => {
            $.ajax({
                type: "POST",
                url: "naoeindex/SistemaLogin/VerificaInputLogin.php",
                data: data = {
                    user: InputUserRegistro.value
                },
                dataType: "json",
                success: function(response) {
                    if (response == 'ok') {
                        InputUserMsg.className = 'valid-feedback d-block';
                        InputUserRegistro.className = 'form-control is-valid';
                        InputUserMsg.innerHTML = 'Nome De Usuário Disponível'
                        nome_de_usuario_ok = true
                    } else {
                        InputUserMsg.className = 'invalid-feedback d-block';
                        InputUserRegistro.className = 'form-control is-invalid';
                        InputUserMsg.innerHTML = 'Nome Em Uso'
                        nome_de_usuario_ok = false
                    }
                }
            });
        }, 500);
    } else {
        nome_de_usuario_maior_que_3 = false
    }
}

function PassRegistro() {
    let InputPassRegistro = document.getElementById('RegistroInputPass')
    let InputPassMsg = document.getElementById('msgPassRegistro')
    let ValorInputPass = InputPassRegistro.value;
    let valido = true;

    if (!ValorInputPass.match(/\d/)) {
        valido = false;
        InputPassRegistro.className = "form-control is-invalid"
        InputPassMsg.className = 'invalid-feedback d-block';
        InputPassMsg.innerText = "Senha fraca: A senha deve conter pelo menos um número.";
    }

    if (!ValorInputPass.match(/[a-z]/) || !ValorInputPass.match(/[A-Z]/)) {
        valido = false;
        InputPassMsg.className = 'invalid-feedback d-block';
        InputPassMsg.innerText = "Senha fraca: A senha deve conter pelo menos uma letra minúscula e uma letra maiúscula.";
        InputPassRegistro.className = "form-control is-invalid"
    }
    /*if (!ValorInputPass.match(/[!@#$%&'()*+,-./[\]^_`{|}~"]/)) {
        valido = false;
        InputPassMsg.className = 'invalid-feedback d-block';
        InputPassMsg.innerText = "Senha fraca: A senha deve conter pelo menos um caractere especial.";
        InputPassRegistro.className = "form-control is-invalid"
    }*/

    if (valido) {
        InputPassMsg.innerText = "Senha valida"
        InputPassMsg.className = 'valid-feedback d-block'
        InputPassRegistro.className = "form-control is-valid"
        return ValorInputPass
    }

    //let valido = InputUserRegistro.value.length > ('! @ # $ % 6 & ')
}

function PassRegistroRepita() {
    let InputPassRegistro2 = document.getElementById('RegistroInputPassRpt')
    let InputPassMsg2 = document.getElementById('msgPassRegistro2')
    let PrimeiraSenha = PassRegistro();

    if (PrimeiraSenha == InputPassRegistro2.value) {
        InputPassMsg2.innerText = "Tudo nos Conformes"
        InputPassMsg2.className = 'valid-feedback d-block'
        InputPassRegistro2.className = "form-control is-valid"
        return true
    } else {
        InputPassMsg2.innerText = "As senhas não coincidem"
        InputPassMsg2.className = 'invalid-feedback d-block'
        InputPassRegistro2.className = "form-control is-invalid"
        return false
    }
}

function ButaoEdnaldo(tipopass) {
    if (tipopass == 'Edinaldinho') {

        let button = document.getElementById('Edinaldinho')
        let InputPassRegistro = document.getElementById('RegistroInputPass')

        if (InputPassRegistro.type == "password") {
            InputPassRegistro.type = "text";
            button.style.backgroundImage = 'url("/naoeindex/HF-pages/Edinaldo.png")';
        } else {
            InputPassRegistro.type = "password";
            button.style.backgroundImage = 'url("/naoeindex/HF-pages/edinaldo2.png")';
        }

    }
    if (tipopass == 'Edinaldinho2') {
        let button = document.getElementById('Edinaldinho2')
        let InputPassRegistro = document.getElementById('RegistroInputPassRpt')
        if (InputPassRegistro.type == "password") {
            InputPassRegistro.type = "text";
            button.style.backgroundImage = 'url("/naoeindex/HF-pages/Edinaldo.png")';
        } else {
            InputPassRegistro.type = "password";
            button.style.backgroundImage = 'url("/naoeindex/HF-pages/edinaldo2.png")';
        }
    }
}

$('#RegistroForm').on('submit', (e) => {
    e.preventDefault();
    if (PassRegistroRepita() && nome_de_usuario_ok && nome_de_usuario_maior_que_3) {

        let dataSingUp = {
            user: $('#RegistroInputUser').val(),
            pass: CryptoJS.SHA256($('#RegistroInputPassRpt').val()).toString(),
            tipo: 'registro'
        }

        alert('fazer registro')
            //Bruno é Gay
        $.ajax({
            type: 'POST',
            url: 'naoeindex/SistemaLogin/registro.php',
            data: dataSingUp,
            dataType: 'json',
            success: function(response) {
                if (response == '...') {
                    //window.open('../', '_self');
                }
                document.getElementById('msgPassLogin').className = 'invalid-feedback d-block'
                document.getElementById('msgPassLogin').innerHTML = response;
                $('#msgPassLogin').addClass('pulsar');
                setTimeout(function() {
                    $('#msgPassLogin').removeClass('pulsar');
                }, 500);

            },
            error: function(error) {
                console.log('Erro na requisição AJAX:', error);
            }
        })
    }
})

//Login com google,x,discord:
function appsbtn(i) {
    switch (i) {
        case 1:
            window.open('LoginApps/google.php', '_self');
            break;
        case 2:
            window.open('LoginApps/discord.php?action=login', '_self');
            break;
        case 3:
            window.open('LoginApps/twitter.php', '_self');
            break;
    }
}
//ALOU fodeu aqui
