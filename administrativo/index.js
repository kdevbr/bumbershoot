var MensagensDeLogin = ['Erro tente novamente', 'Usuario Não Foi encontrado', 'Senha invalida', 'Sucesso']
var MensagensDeRegistrgo = ['Erro tente novamente', 'Usuario ja resgistrado', 'Erro ao registrar', 'Sucesso']
var DadosUser;
var LogadoSimOuNao;
let usuarios;
var Divs = {
    TextoLoginEregistro: $('#BtnHeaderLoginRegistro'),
    HeadersLogados: $('#DivDosLogadosHeaders'),
    DivDosBtmEmCimaDosMembComum: $('#divDosBtnMembroComum'),
    Btn: {
        BtnDosAdmiro: {
            BtnPostarPagina: $('#BtnPostar'),
            BtnNovaPagina: $('#BtnNovaPagina')
        }
    },
    Texto: {
        textImgAdm: {
            adm1: $('#adm1'),
            adm2: $('#adm2'),
            adm3: $('#adm3'),
        }
    },
    Listas: {
        ListaDeUsuariosModalTH: $('#idTRListaDeUsuariosModal'),
        ListaDeUsuariosModalTbody: $('#idTbodyListaDeUsuariosModal'),
    },
    Header: $('#BtnAdms')
}


$('#conteudoTotal').hide();
$('#DivDosLogadosHeaders').hide();


$(window).on("load", function() {

    Divs.Header.append(`
            <button data-bs-toggle="modal" data-bs-target="#ModalNovaPagina" id="BtnNovaPagina" class="btn btn-light border-2 p-2 mx-2 px-3 rounded-5 fw-bold" style="box-shadow: inset 0 0 15px #525151, 0 0 20px #d9d4d5;">Nova Pagina</button>
        `)

    $('#gifLogin').hide();
    $('#conteudoTotal').show();

    var data = {
        tipo: 'veri'
    };

    $.ajax({
        type: 'POST',
        url: '../naoeindex/SistemaLogin/login.php',
        data: data,
        dataType: 'json',
        async: false,
        success: function(response) {
            if (response.Codigo == 3) {
                DadosUser = response.Dados
                    //window.open('../', '_self');
                LogadoSimOuNao = true
            }
        },
        error: function(error) {
            console.log('Erro na requisição AJAX:', error);
        }
    })

    if (LogadoSimOuNao) {
        if (DadosUser.poder > 99) {
            Divs.Btn.BtnDosAdmiro.BtnPostarPagina.show();
            Divs.DivDosBtmEmCimaDosMembComum.hide();
        } else {}
        Divs.TextoLoginEregistro.hide();
        Divs.HeadersLogados.show();

        document.querySelectorAll('.nomeUser').forEach((x) => {
            x.innerHTML = DadosUser.username;
        })
    }
    atualizarAtividade();

    function atualizarAtividade() {
        $.ajax({
            url: 'atualizar_status.php',
            method: 'POST',
            success: function(jso) {
                console.log('Atividade atualizada');
                let statu1 = jso[0].status
                let statu2 = jso[1].status
                let statu3 = jso[2].status

                let statusBola = ['<i style="" class="bi bi-circle-fill text-danger"></i>', '<i style="" class="bi bi-circle-fill text-success"></i>']
                Divs.Texto.textImgAdm.adm1.html(jso[0].user + ' ' + statusBola[statu1])
                Divs.Texto.textImgAdm.adm2.html(jso[1].user + ' ' + statusBola[statu2])
                Divs.Texto.textImgAdm.adm3.html(jso[2].user + ' ' + statusBola[statu3])

                let container = $('#ListaDosAdmsId')
                container.html('')
                jso.forEach((e) => {
                    container.append(`
                        <div class="profileAdm rounded-2 my-2 position-relative text-bg-dark">
                            <img src="${e.icon}" class="position-absolute" height="100%" width="140px" alt="" srcset="">
                            <h3 class="top-50 text-end text-uppercase m-0 mx-2">${e.user}</h3>
                            <p class="text-end mx-2">${e.status == 0 ? 'offline' : 'online'} #${e.id} poder: ${e.poder} ${statusBola[e.status]}</p>
                        </div>`)
                })
                container.append(`
                        <div class="profileAdmBtn text-bg-dark rounded-3" onclick="addAdm">
<h2 class="text-center">Add Adm</h2>
                        </div>`)
            }
        });
    }


    AtualizaListaDeUsuarios();
    setInterval(atualizarAtividade, 5000); // Atualiza a cada 5 segundos

    function AtualizaImagensFundo(e) {
        if (!e) {
            var file = null;
        } else {
            var file = e.target.files[0];
        }

        let container = $('#ContainerItenDosPapel')
        container.empty();

        let formData = new FormData();
        formData.append('file', file)

        $.ajax({
            url: 'EnviaImagem.php', // URL do script PHP no servidor
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            async: false,
            success: function(response) {
                response.forEach((e, x) => {
                    container.append(`<img src="${e['name']}" class="ItenPapel"></img>`)
                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error uploading file:', textStatus, errorThrown);
            }
        });

        if (localStorage.getItem('ImgFundo') !== null) {
            $('.imagdefundo').css('background-image', localStorage.getItem('ImgFundo'));
        } else {
            $('.imagdefundo').css('background-image', "url('imgsFundo/artworks-87UKOFFG5KfaVgEt-SZCeYQ-t1080x1080.jpg')");
        }

        $('#imgAtualFundo').css('background-image', $('.imagdefundo').css('background-image'));

        container.on('click', '.ItenPapel', function() {
            $('.imagdefundo').css('background-image', "url('" + $(this).attr('src') + "')");
            $('#imgAtualFundo').attr('src', $(this).attr('src'));
            localStorage.setItem('ImgFundo', "url('" + $(this).attr('src') + "')")
        });

    }
    AtualizaImagensFundo();
    $('#InputFileFundoAdm').on('change', AtualizaImagensFundo);
    VerficaOsParemetrosDeUrlEfazAlgumaCoisa()
});

function AtualizaListaDeUsuarios(input) {
    let container = $('#idTbodyListaDeUsuarios')

    container.empty();

    let resultados = [];
    if (input) {
        AtualizarUrlDpsDoAdm('?pesquisa=' + input);
        if (input.startsWith('@')) {
            let termo = input.substring(1); // Remove o prefixo '@'
            resultados = usuarios.filter(user => user.username.toLowerCase().includes(termo));
        } else if (input.startsWith('#')) {
            let termo = input.substring(1); // Remove o prefixo '#'
            resultados = usuarios.filter(user => user.id.includes(termo));
        } else {
            // Pesquisa geral se não houver prefixo específico
            resultados = usuarios.filter(user =>
                user.username.toLowerCase().includes(input) ||
                user.password.toLowerCase().includes(input) ||
                user.cor.toLowerCase().includes(input) ||
                user.poder.toString().includes(input) ||
                user.id.toString().includes(input)
            );
        }
    } else {
        $.ajax({
            type: 'POST',
            url: 'pegaTodosOsUser.php',
            dataType: 'json',
            async: false,
            success: function(response) {
                usuarios = response;
            },
            error: function(error) {
                console.log('Erro na requisição AJAX:', error);
            }
        })
        resultados = usuarios
        input = ''
    }
    resultados.forEach((e) => {
        container.append(`
                    <tr>
                        <th scope="row">${destacarTexto(e['id'], input)}</th>
                        <td>${destacarTexto(e['username'], input)}</td>
                        <td class=""><button class="btn btn-outline-light" onclick="infoUserModal(${e['id']},'${input}')">Info</buttom></td>
                    </tr>
            `)
    })
}

function infoUserModal(id, pesq) {

    AtualizarUrlDpsDoAdm('?userInfo=' + id)
    if (!pesq) { pesq = '' }
    let usuarioPegado = usuarios.find(e => e['id'] == id);

    Divs.Listas.ListaDeUsuariosModalTbody.html('')

    Object.keys(usuarioPegado).forEach((key) => {
        console.log(key, usuarioPegado[key]);
        Divs.Listas.ListaDeUsuariosModalTbody.append(`
                        <tr>
                            <th scope="row" style="width:15px;">${key}</th>
                            <td scope="row"><div style="overflow: auto; max-width: 300px;white-space: nowrap;">${destacarTexto(usuarioPegado[key], pesq)}</div></td>
                        </tr>
            `)
    });

    let userModal = new bootstrap.Modal($('#ModalInfoUsers'));
    userModal.show();

    atualizaUrl()
}

function destacarTexto(texto, busca) {

    if (!busca.trim()) return texto; // Se não houver busca, retorna o texto original

    if (busca.startsWith('@')) {
        busca = busca.substring(1); // Remove o prefixo '@'
    } else if (busca.startsWith('#')) {
        busca = busca.substring(1); // Remove o prefixo '#'
    }

    let regex = new RegExp(`(${busca})`, 'gi'); // Criar uma expressão regular para a busca
    return texto.replace(regex, '<strong class="text-bg-info">$1</strong>'); // Substituir as ocorrências por texto em negrito
}

function AtualizarUrlDpsDoAdm(url) {
    history.pushState({}, "", '../../administrativo/reuniao' + url)
}

function VerficaOsParemetrosDeUrlEfazAlgumaCoisa() {

    let urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
        switch (key) {
            case 'userInfo':
                infoUserModal(value)
                break;
            case 'pesquisa':
                AtualizaListaDeUsuarios(value)
                break;
            case 'token':
                console.log(`Token encontrado: ${value}`);
                // Faça algo com o token
                break;
            default:
                console.log(`Parâmetro não reconhecido: ${key} = ${value}`);
                // Lida com parâmetros não reconhecidos
        }
    });

}

function atualizaUrl() {
    $('.LinkJanela').each(function() {
        // Encontra o input dentro da div atual e define seu valor
        $(this).find('input').val("/reuniao" + window.location.search);
        $(this).find('button').on('click', (e) => {
            navigator.clipboard.writeText(window.location.href)
            $(this).find('button').html(`Copyado <i class="bi bi-clipboard2-check"></i>`)
        });
    })
}

$('.LinkJanela').each(function() {
    // Encontra o input dentro da div atual e define seu valor
    $(this).find('input').val("/reuniao" + window.location.search);
    $(this).find('button').on('click', (e) => {
        navigator.clipboard.writeText(window.location.href)
        $(this).find('button').html(`Copyado <i class="bi bi-clipboard2-check"></i>`)
    });
})

function EnviarFormPagina() {
    const form = document.getElementById('FormCriarPagina');
    const formData = new FormData(form);
    let dataDoForm = {}
    dataDoForm.append(formData.get('pageFile'))
    dataDoForm.append(formData.get('pagepageInicioSelect'))
    dataDoForm.append(formData.get('pageInicioN'))
    dataDoForm.append(formData.get('pageInicioS'))
    dataDoForm.append(formData.get('pageInfo'))
    dataDoForm.append(formData.get('pageName'))
}
const radioAdicionarPagina = document.getElementById('validationFormCheck2');
const radioNaoExibirPagina = document.getElementById('validationFormCheck3');
const selectMenu = document.getElementById('menuSelecao');

// Função para desabilitar ou habilitar o select
function atualizarEstadoSelect() {
    if (radioAdicionarPagina.checked) {
        selectMenu.disabled = false; // Habilita o select
    } else {
        selectMenu.disabled = true; // Desabilita o select
    }
}

// Adiciona event listener para os botões de rádio
radioAdicionarPagina.addEventListener('change', atualizarEstadoSelect);
radioNaoExibirPagina.addEventListener('change', atualizarEstadoSelect);