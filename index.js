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

        TituloMain.toggleClass('AnimaMainEntradaText');
        TituloMain.toggleClass('AnimaMainSaidaText');

        setTimeout(() => {
            contentDiv.load('naoeindex/paginaInicialMain.php')
        }, 800)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
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
                $(".CorpoContainerMainI").html('');
                setTimeout(() => {
                    if (response['dados'].erro == 404) {
                        contentDiv.html(`
                            <div class="CabecaContainerMain">
                                <div class="text-light d-flex justify-content-between flex-wrap">
                                    <div id="TituloMain" class="AnimaMainEntradaText pt-2 ladoEsquedoHeadMainConteudo ms-3">
                                        <h2 id="TituloMain">${response['dados'].titulo}</h2>
                                        <h5 class="">Publicado por: ${response['dados'].autor}</h5>
                                    </div>
                                    <div class="ladoDireitoHeadMainConteudo me-3 mt-1 col-12 col-sm-2">
                                        <h6 class="text-center">Postado:<br>${response['dados'].data}</h6>
                                    </div>
                                </div>
                            </div>
                                        `);
                    } else {
                        contentDiv.html(`
                <div class="CabecaContainerMain">
                    <div class="text-light d-flex justify-content-between flex-wrap">
                        <div id="TituloMain" class="AnimaMainEntradaText pt-2 ladoEsquedoHeadMainConteudo ms-3">
                            <h2 id="TituloMain">${response['dados'].titulo}</h2>
                            <h5 class="">Publicado por: ${response['dados'].autor}</h5>
                        </div>
                        <div class="ladoDireitoHeadMainConteudo me-3 mt-1 col-12 col-sm-2">
                            <h6 class="text-center">Postado:<br>${response['dados'].data}</h6>
                        </div>
                    </div>
                </div>
                <div class="CorpoContainerMain flex-fill m-3 text-white">
                    <div class="flex-wrap m-1 d-flex">
                        <img class="headerCorpoMainFi rounded-1 w-75 object-fit-contain" src="${response['dados'].conteudo.img}" style="" alt="">
                        <div class="headerCorpoMainFi d-flex m-2 flex-column" style="">
                            <h1 class="m-0">${response['dados'].titulo}</h1>
                            <h6 class="m-0">${response['dados'].conteudo.subtitulo}</h6>
                            <a href="${response['dados'].link}" class="btn p-1 mt-1 fw-medium fs-4 btn-success text-start rounded-1">Acessar a ultima versao <i class="bi bi-box-arrow-up-right" style="
                                vertical-align: 0px;
                            "></i></a>
                            <div class="dropdown">
                                <a class="btn p-1 my-1 w-100 fw-medium fs-4 btn-dark text-start rounded-1 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" disabled>
                                    Outras versoes
                                </a>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li><a class="dropdown-item" href="#">v1</a></li>
                                    <li><a class="dropdown-item" href="#">v1.1</a></li>
                                    <li><a class="dropdown-item" href="#">v2</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="headerCorpoMainFi d-flex m-2 flex-column" style="">
                            <p>${response['dados'].conteudo.desc}</p>
                        </div>
                    </div>
                </div>
                            `);
                    }

                }, 1000)

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Exibir mensagem de erro no elemento contentDiv
                contentDiv.html("<h2>Erro</h2><p>correu um erro ao carregar a página.</p>");

                // Registrar detalhes do erro no console
                console.error('Erro ao carregar a página:', textStatus, errorThrown);
                console.error('Resposta do servidor:', jqXHR.responseText);
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
    if (ValorInputPass.length < 8) {
        valido = false;
        InputPassRegistro.className = "form-control is-invalid"
        InputPassMsg.className = 'invalid-feedback d-block';
        InputPassMsg.innerText = "Senha fraca: A senha deve conter pelo menos 8 caracteres.";
    }
    /*
        if (!ValorInputPass.match(/[a-z]/) || !ValorInputPass.match(/[A-Z]/)) {
            valido = false;
            InputPassMsg.className = 'invalid-feedback d-block';
            InputPassMsg.innerText = "Senha fraca: A senha deve conter pelo menos uma letra minúscula e uma letra maiúscula.";
            InputPassRegistro.className = "form-control is-invalid"
        }
        if (!ValorInputPass.match(/[!@#$%&'()*+,-./[\]^_`{|}~"]/)) {
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

        //Bruno é Gay
        $.ajax({
            type: 'POST',
            url: 'naoeindex/SistemaLogin/registro.php',
            data: dataSingUp,
            success: function(response) {
                if (response.Codigo == 3) {
                    DadosUser = response.Dados
                        //window.open('../', '_self');
                    LogadoSimOuNao = true
                } else {
                    LogadoSimOuNao = false
                }
                document.getElementById('msgPassRegistro2').className = 'invalid-feedback d-block'
                document.getElementById('msgPassRegistro2').innerHTML = MensagensDeRegistrgo[response.Codigo];
                $('#msgPassRegistro2').addClass('pulsar');
                setTimeout(function() {
                    $('#msgPassRegistro2').removeClass('pulsar');
                    $('#ModalRegistro').modal('hide');
                    EstasLogado();

                }, 500);

            },
            error: function(error) {
                console.log('Erro na requisição AJAX:', error);
                console.log('Detalhes do erro:', error.responseText);
            }
        })
    }
})

//Login com google,x,discord:
function appsbtn(i) {
    alert('Ainda não implementado')
}
//fodeu
function BotoesInicial(sexo) {
    history.pushState({}, "", sexo);
    loadContent(sexo);
}


$.ajax({
    type: "GET",
    url: "administrativo/VerificaQuaisPaginasEstaoNaPaginaInicial.php",
    dataType: "json",
    async: false,
    success: function(res) {
        // Arrays para armazenar os resultados
        let tela1 = [];
        let tela2 = [];
        let tela3 = [];

        // Iterar sobre os objetos recebidos
        res.forEach(item => {
            switch (parseInt(item.TelaInicial)) {
                case 1:
                    tela1.push(item);
                    break;
                case 2:
                    tela2.push(item);
                    break;
                case 3:
                    tela3.push(item);
                    break;
            }
        });

        // Preencher com vazio se algum array estiver vazio
        if (tela1.length === 0) tela1.push('vazio');
        if (tela2.length === 0) tela2.push('vazio');
        if (tela3.length === 0) tela3.push('vazio');

        // Combinar os arrays na ordem desejada
        let resultadoFinal = [...tela1, ...tela2, ...tela3];

        // Exibir ou processar o resultado final
        console.log(resultadoFinal);
        resultadoFinal.forEach((e, i) => {
            $('.btn-container').append(`<a onclick="BotoesInicial('${e.linkURL}')"><button id="myButton${e.TelaInicial}" class="btnn slide_diagonal">${e.titulo}</button></a>`)
        })
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Erro ao verificar páginas:', textStatus, errorThrown);
    }
});