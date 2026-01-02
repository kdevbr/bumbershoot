let loaderItem = $("#loaderList");
let loaderItemArray = loaderItem.children();
let auraSpan = $("#auraSpan");
let nivelSpan = $("#nivelSpan");
let footer = $("footer");
footer.toggleClass("d-none");
save = {
    nivel: 1,
    aura: 0,
    dicasCompradas: []
}
let dicaNivel = "";

function addItemLoader(title) {
    loaderItem.append(`
        <div class="d-flex justify-content-between ">
          <p class="m-0 lh-lg">${title}</p>
          <div class="spinner-border mx-2 text-primary" id="loader" role="status"></div>
        </div>
  `)
    loaderItemArray = loaderItem.children();
}
function lastItemError() {
    let lastItem = loaderItemArray.last();
    lastItem.find("#loader").attr("class", "fs-4");
    lastItem.find("#loader").html(`<i class=" mx-2 bi bi-x-circle text-danger"></i>`);
}
function lastItemSuccess() {
    let lastItem = loaderItemArray.last();
    lastItem.find("#loader").attr("class", "fs-4");
    lastItem.find("#loader").html(`<i class=" mx-2 bi bi-check-circle text-success"></i>`);
}
$(function () {


    async function verificaLogin() {
        try {
            addItemLoader("Verificando Login...");

            const data = await $.get("../../naoeindex/verificaLogin.php");

            if (data === "1") {
                lastItemSuccess();
                return true;
            } else {
                loaderItem.append(`
    <a class="btn btn-dark mt-3 btn-sm fadein" href="https://furmigueiro.cyou">Fazer Login</a>
      `)
                lastItemError();
                return false;
            }
        } catch (error) {

            lastItemError();
            console.error("Erro na verificação de login:", error);
            return false;
        }
    }

    async function carregandoDados() {
        try {
            addItemLoader("Carregando Dados...");

            let data = await $.getJSON("bdcicada.php");
            if (data.dados === "Usuario Criado") {
                lastItemSuccess();
                return true;
            } else {
                console.log(data.dados.nivel);
                lastItemSuccess();
                save = data.dados;
                if (save.dicasCompradas[save.nivel] == true) {
                    $.get("dica.php", {},
                        function (data, textStatus, jqXHR) {
                            dicaNivel = data.dica;
                        },
                        "json",
                    );
                }
                return true;
            }
        } catch (error) {
            lastItemError();
            console.error("Erro ao carregar dados:", error);
            return false;
        }
    }

    async function iniciarJogo() {
        const etapas = [verificaLogin, carregandoDados];

        for (let etapa of etapas) {
            let ok = await etapa();
            if (!ok) {
                // Se der erro, interrompe o fluxo
                return;
            }
        }

        // Se todas passarem
        addItemLoader("Tudo pronto, iniciando o jogo!");
        loaderItem.remove();

        videoAnimation()
    }
    function videoAnimation() {
        if ($("#conteudo").is(":visible")) {
            $("#conteudo").fadeOut(1000, function () {
                $(".ani").fadeIn(100, function () {
                    wordflick(['Nivel ' + (save.nivel), 'Aura: ' + (save.aura)], aniOut);
                });
            });
        } else {
            wordflick(['Nivel ' + (save.nivel), 'Aura: ' + (save.aura)], aniOut);
        }

        function aniOut() {
            $(".ani").fadeOut(1000, () => {
                $("#conteudo").fadeIn(400); // mostra o conteúdo do jogo
                carregarniveljquery(String(save.nivel))
            });
        }
    }


    $("#code").on("change", function () {

        let code = $(this).val();
        $(this).val("");

        $.post("bdcicada.php", { code: code },
            function (data, textStatus, jqXHR) {

                if (data.Check == true) {
                    save = data.Save
                    if (save.fim) {
                        $("#conteudo").append(`VOCE PASSOU TODOS OS NIVEIS 🎆🎆🎆`);
                    } else {
                        videoAnimation()
                    }
                }
                if (data.Check == false) {
                    alert("Codigo invalido");
                }

                if (data.Save.fim) {
                    save.fim = true;
                } else {
                    save.fim = false;
                }
            },
            "json"
        );

    })
    iniciarJogo()
    function comprarDica() {
        if (save.dicasCompradas[save.nivel] == true) {
            alert('A dica é : ' + dicaNivel);
            return;
        }
        $.get("dica.php", {},
            async function (data, textStatus, jqXHR) {
                if (data.dica) {
                    dicaNivel = data.dica;
                    let ok = await carregandoDados()
                    if (ok) {
                        carregarniveljquery(String(save.nivel))
                    }
                }
            },
            "json",
        ).fail(function (jqXHR) {
            if (400 === jqXHR.status) {
                alert("Dica não encontrada.");
            }
        });

    }
    $("#footer").find("button").on("click", comprarDica);
});
function carregarniveljquery(nivel) {
    footer.removeClass("d-none");
    nivelSpan.text("nivel " + nivel);
    auraSpan.text(save.aura);

    if (save.dicasCompradas[nivel] == true) {
        $("#footer").find("button").html(dicaNivel)
    }
    if (save.fim) {
        alert("Parabens, você chegou ao fim do Cicada 2469!");
    }
    $.get("getNivelLink.php", { nivel: nivel }, function (data) {
        if (data.conteudo) {
            $("#conteudo").html(data.conteudo);
        } else {
            console.error("Erro ao obter o conteúdo do nível.");
        }
    }, "json").fail(function () {
        console.error("Falha na requisição para obter o conteúdo do nível.");
    });
}


var part,
    i = 0,
    offset = 0,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 100;
var wordflick = function (words, callback) {
    let len = words.length
    let letrinhas = setInterval(function () {
        if (forwards) {
            if (offset >= words[i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        }
        else {
            if (offset == 0) {
                forwards = true;
                i++;
                offset = 0;
                if (i >= len) {
                    i = 0;
                    clearInterval(letrinhas);

                    if (callback) callback();
                }
            }
        }
        part = words[i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            }
            else {
                offset--;
            }
        }
        $('.word').text(part);
    }, speed);
};
