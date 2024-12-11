class Game {
    constructor() {

        this.PPs = 0; //pontos por segundo
        this.pontos = 0 //pontos
        this.pontosAcumulados = 0; //pontos acumulados
        this.variaveisDeClick = {
            poderdoclick: 1,
            poderdoclickporcentro: 0,
            poderdoclickIntegro: 0,
            poderdoclickPor: 0,
        };

        this.TotalClick = (1 + (this.variaveisDeClick.poderdoclickPor / 100)) * (this.variaveisDeClick.poderdoclickIntegro + this.variaveisDeClick.poderdoclick + (this.PPs * this.variaveisDeClick.poderdoclickporcentro) / 100);

        this.upgrades = [];
        this.upgradesLiberados = [];
        this.upgradesComprados = [];
        this.buildings = [];
        this.buildingsLiberadas = [];
        this.add = 0;
        this.addmenos = 0;
        this.totaldeconstrucao = 0;
        this.online = {
            logado: false,
            username: ""
        }
        this.multiplayer = 100;
        this.especial = {
            carabina: 0,
            auxilio: 0
        }
        this.tempoInicial = new Date().getTime();
        this.tempoDecorrido;
        this.divsCriadas = {};

    }

    click() {

        this.TotalClick = (1 + (this.variaveisDeClick.poderdoclickPor / 100)) * (this.variaveisDeClick.poderdoclickIntegro + this.variaveisDeClick.poderdoclick + (this.PPs * this.variaveisDeClick.poderdoclickporcentro) / 100);

        this.pontosAcumulados += this.TotalClick
        this.pontos += this.TotalClick

    }
    saveGame(a) {
        const serializedBuildings = this.buildings.map(building => building.saveBuilding());
        const serializedUpgrades = this.upgrades.map(upgrade => upgrade.saveUpgrade());

        const data = {
            PPs: this.PPs,
            Pontos: this.pontos,
            PontosAcumulados: this.pontosAcumulados,
            buildings: serializedBuildings,
            upgrades: serializedUpgrades,
            totalBuild: SomaQuntConstrucao(),
            TempoComeca: this.tempoInicial,
            TempoAcaba: this.tempoDecorrido,
        };
        //console.log(serializedUpgrades)
        if (a == 0) {
            return JSON.stringify(data, null, 2);
        }
        if (a == 1) {
            return this.PontosAcumulados;
        }

    }

    loadGame() {

        const savedData = localStorage.getItem('savedojogo');

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            console.log(parsedData)
            this.pontos = parsedData.Pontos
            this.pontosAcumulados = parsedData.PontosAcumulados


            if (parsedData.TempoComeca) {
                this.tempoInicial = parsedData.TempoComeca
                if (parsedData.TempoAcaba) {
                    this.tempoInicial = (parsedData.TempoAcaba)
                }
            }
            if (parsedData.TempoAcaba) {
                this.tempoInicial = (new Date().getTime() - parsedData.TempoAcaba)
            }

            parsedData.buildings.forEach(savedBuilding => {
                const existingBuilding = this.buildings.find(building => building.name === savedBuilding.name);
                Building.loadBuilding(savedBuilding, existingBuilding);
            });

            // Carregar dados de upgrades



            if (parsedData.upgrades) {
                parsedData.upgrades.forEach(savedUpgrade => {
                    const existingUpgrade = this.upgrades.find(upgrade => upgrade.nome === savedUpgrade.nome);
                    Upgrade.loadUpgrade(savedUpgrade, existingUpgrade);
                });
            }



            this.upgrades.forEach((up) => {
                if (up.Comprado === true) {
                    up.AplicaUp('nao');
                }
            });

            if (this.pontos == null) {
                this.pontos = 0;
            }
            if (this.pontosAcumulados == null) {
                this.pontosAcumulados = 0;
            }



            const poderTotalAoCarregar = this.buildings.reduce((total, building) => total + (building.power * building.quantidade), 0);
            this.PPs = poderTotalAoCarregar;



        }

        if (window.innerWidth > 920) {
            var upgradesContainerdomieo = document.getElementById("pontosd")
        } else {
            var upgradesContainerdomieo = document.getElementById("pontosd1")
            document.getElementById("containercell").className = "";
            document.querySelector('body').className = ""
        }

        const pontosd = document.createElement("div");
        pontosd.className = "position-sticky"
        pontosd.style.top = '7px'
        pontosd.style.zIndex = "10"
        pontosd.innerHTML = `

        <div class="border-3 border border-success position-relative bg-gradient rounded-2 mb-2 bg-success" style="height: 75px;">
            <h1 id="PontosD" class="text-center mt-0 text-black b border-bottom border-3 fw-semibold col-12 fs-1" style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;text-shadow: 2px 1px 3px rgba(66, 66, 66, 0.575), 0 0 1em rgb(0, 255, 42), 0 0 0.2em rgb(0 255 43);"></h1>
            <h6 class="text-center position-absolute centrohorizontal col-12" style="bottom: -7px;">Por Segundo: <span id="PPsD"></span></h6>
        </div>

        `;
        upgradesContainerdomieo.insertBefore(pontosd, upgradesContainerdomieo.firstChild);

        const upgradesContainer2 = document.getElementById("header2")
        const logindiv = document.createElement("div");
        logindiv.innerHTML = `
        <div class=" mx-1 pb-2 px-2 rounded-1 border border-1 border-dark border-opacity-75 transition-bg upgrade-container cordofundoup2" style="z-index:1;height: 84px;top:0; left:0;">
        <h6 class="mb-2">Acesso A Conta: <span id="Acessoaconta" class="text-bg-warning"></h6>
        
        <button class="btn btn-primary rounded-1 fw-semibold" style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .90rem; type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Conta
        </button>
        <button class="btn btn-primary rounded-1 fw-semibold" style="--bs-btn-padding-y: .18rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .90rem;" data-bs-target="#ModalLeaderboard" data-bs-toggle="modal">
        Leaderboard <img src="img/leaderboard.png" style="height:20px;">
        </button>
        
        </div>
        `;
        upgradesContainer2.appendChild(logindiv);

        $.ajax({
            url: 'online.php',
            method: 'GET',
            data: 'Verifica',
            dataType: 'json',
            success: function(res) {
                if (res) {
                    $('#Acessoaconta').text('Logado')
                    $('#Acessoaconta').toggleClass('text-bg-warning text-bg-warning')
                    game.online.logado = true
                    game.online.username = res;
                } else {
                    $('#Acessoaconta').text('Desconectado')
                    $('#Acessoaconta').toggleClass('text-bg-warning text-bg-danger')
                    game.online.logado = false
                }
            }
        })


        ajaxSorebord()


        this.updateUI();
        this.MostraConstrucaoDiv();
        this.MostraUpgradeDiv();

        this.initializeUI();
        this.AtualizaPorSegundo();
    }

    AtualizaPorSegundo() {
        const PontosD = document.getElementById("PontosD");

        let currentPPs = 0;
        let startTime;
        const interval = 1000; // intervalo em milissegundos

        const updatePPs = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / interval, 1);
            const newPPs = this.PPs * percentage;
            const deltaPPs = newPPs - currentPPs;
            currentPPs += deltaPPs;

            PontosD.innerText = formatarNumero(this.pontos + currentPPs);

            if (progress < interval) {
                requestAnimationFrame(updatePPs);
            } else {
                this.pontosAcumulados += currentPPs; // Adicione currentPPs ao total
                this.pontos += currentPPs;
                this.updateUI();
                startTime = timestamp; // Atualize startTime para continuar a animação
                requestAnimationFrame(updatePPs); // Chame a próxima animação
            }
        };

        requestAnimationFrame(updatePPs);
    }


    VerificaConstrucao() {
        //console.time('TotalTime');
        this.buildings.forEach(upgrade => {

            // Verifique se o upgrade ainda não foi desbloqueado e se atende aos requisitos
            if (!this.buildingsLiberadas.includes(upgrade) && this.pontosAcumulados >= upgrade.costUnlock) {
                this.buildingsLiberadas.push(upgrade);
                this.MostraConstrucaoDiv(); // Chame a função para exibir os upgrades disponíveis
            }
        });
        this.upgrades.forEach(upgrade => {
            if (upgrade && !this.upgradesLiberados.includes(upgrade) && upgrade.Desbloqueadoo() && upgrade.Comprado == false && !this.upgradesComprados.includes(upgrade)) {
                this.upgradesLiberados.push(upgrade);
                console.log(upgrade.Comprado)
                this.MostraUpgradeDiv();
            }
            if (!this.upgradesComprados.includes(upgrade) && upgrade.Comprado == true) {
                this.upgradesComprados.push(upgrade);
            }
        })
        this.tempoDecorrido = new Date().getTime() - this.tempoInicial
        console.log(this.tempoDecorrido)
    }
    MostraUpgradeDiv() {

        tiposUnicosUpgradesVariable.forEach((upgrad, index) => {
            const container = document.getElementById('ContainerUp' + upgrad);

            // Verifica se o elemento existe antes de acessar a propriedade innerHTML
            if (container) {
                container.innerHTML = "";
            }
        });

        const atualizanumero = () => {

            this.add = this.upgradesLiberados.length - this.addmenos
            document.getElementById("numeroadicionado").innerText = this.add
            if (this.add == 0) {
                document.getElementById("numeroadicionado").style.display = "none"
            } else {
                document.getElementById("numeroadicionado").style.display = "block"
            }
        }
        atualizanumero()

        this.upgradesLiberados.sort((a, b) => a.cost - b.cost);

        this.upgradesLiberados.forEach((upgrade, index) => {


            const upgradeElement = document.createElement("div");
            upgradeElement.className = "upgradeelemente col-xxl-4 col-md-6 col-12 pe-1"
            upgradeElement.id = "upgradeelemente" + index;

            upgradeElement.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip position-absolute';
                tooltip.innerHTML = `

                <span style="color: wheat;" >${upgrade.desc}</span>
                <div class="border-top border-2 border-warning">${upgrade.info}</div>
                `;

                document.body.appendChild(tooltip);

                const rect = upgradeElement.getBoundingClientRect();
                tooltip.style.top = rect.top - 170 + scrollY + 'px';
                tooltip.style.left = rect.left + 300 - tooltip.offsetWidth + 'px'; // Ajuste para a esquerda
                tooltip.style.zIndex = 1001
            });


            let tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.parentNode.removeChild(tooltip);
            }
            upgradeElement.addEventListener('mouseleave', () => {
                tooltip = document.querySelector('.custom-tooltip');
                if (tooltip) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            });

            let Disponivel8002;
            if (upgrade.Comprado) {
                Disponivel8002 = "Adquiridos"
            } else {
                if (upgrade.cost < this.pontos) {
                    Disponivel8002 = "Disponivel"
                } else {
                    Disponivel8002 = "Você é pobre"
                }
            }

            upgradeElement.innerHTML = `
                <div class="p-2 border-black ${upgrade.efeito.multiplayer ? 'roxobonitao' : upgrade.efeito.click ? 'verdebonitao' : 'azulbonitao'} border rounded-1 mb-2 position-relative">
                    <h5 class="position-absolute text-start mx-auto text-black" style="left:80px; top: 5px;">${upgrade.nome}</h5>
                    <p id="upgradetext${index}" class="position-absolute fs-5 fst-italic fw-semibold" style="left:80px; bottom: -5px;">${formatarNumero(upgrade.cost)}</p>
                    <p class="position-absolute text-black fs-5 fst-italic fw-semibold" style="right: 15px; bottom: -5px;">${Disponivel8002}</p>
                    <img class="" src="${upgrade.img}" width="60px" height="60px">
                </div>
            `;

            document.getElementById("QuantasUpgradesCompradas").innerText = this.upgradesComprados.length + 1 + "/" + this.upgrades.length + " (" + ((this.upgradesComprados.length + 1) / this.upgrades.length * 100).toFixed(2) + "%)";

            upgradeElement.addEventListener("click", () => {
                upgrade.CompraUpgrade();

                const poderTotalAoCarregar = this.buildings.reduce((total, building) => total + (building.power * building.quantidade), 0);
                this.PPs = poderTotalAoCarregar;

                if (upgrade.Comprado) {
                    this.addmenos--;
                    this.upgradesComprados.push(upgrade);
                    this.upgradesLiberados.splice(index, 1);
                    const tooltip = document.querySelector('.custom-tooltip');
                    if (tooltip) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                    upgradeElement.style.display = 'none';
                    this.AtualizaEspecial()
                    this.MostraUpgradeDiv();
                    this.MostraConstrucaoDiv()
                }

                this.Mudarcordocustodasconstrucao();
            });


            // Objeto para rastrear se uma div já foi criada para cada tipo


            tiposUnicosUpgradesVariable.forEach((tipo, index) => {
                // Verifica se a div já foi criada para este tipo
                if (!this.divsCriadas[tipo]) {
                    const upgradeElementTipo = document.createElement("div");
                    upgradeElementTipo.id = "ContainerUpMae" + index
                    upgradeElementTipo.style.display = "none"
                    upgradeElementTipo.innerHTML = `
        <div class="col-12 border border-1 border-top border-warning mb-2"></div>
        <div style="border-color:${tipo == '2 - Clique' ? 'rgb(150, 178, 137)' : tipo == '3 - Multiplayer' ? 'rgb(165, 137, 178)':'wheat' }!important;" class="py-1 ps-2 border-top rounded-4 rounded-end-pill border-4 bg-dark mb-2 col-sm-4 col-12 bg-opacity-75">
            <h3 style="color: wheat; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;" class="mx-2 mb-1 m-0 p-0 border-bottom border-2 border-white col-10">${tipo}<span class="fs-6 ms-2" id="QuantasUpgradesCompradas"></h3>
        </div>
        <div class="row" id="ContainerUp${tipo}">
        </div>
    `;
                    // Adiciona a div ao DOM
                    document.getElementById("tiposDeUp").appendChild(upgradeElementTipo);
                    // Marca que a div foi criada para este tipo
                    this.divsCriadas[tipo] = true;
                }
            });

            tiposUnicosUpgradesVariable.forEach((upgrad, index) => {
                if (upgrad == upgrade.tipo) {
                    document.getElementById('ContainerUpMae' + index).style.display = "block";
                    document.getElementById('ContainerUp' + upgrad).appendChild(upgradeElement);
                }
            })

            this.Mudarcordocustodasconstrucao();

        });
        this.upgradesComprados.forEach((upgrade, index) => {

            this.upgradesComprados.sort((a, b) => a.cost - b.cost);

            const upgradeElement = document.createElement("div");
            upgradeElement.className = "upgradeelemente col-xxl-4 col-md-6 col-12 pe-1"
            upgradeElement.id = "upgradeelemente" + index;

            upgradeElement.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip position-absolute';
                tooltip.innerHTML = `

                <span style="color: wheat;" >${upgrade.desc}</span>
                <div class="border-top border-2 border-warning">${upgrade.info}</div>
                `;

                document.body.appendChild(tooltip);

                const rect = upgradeElement.getBoundingClientRect();
                tooltip.style.top = rect.top - 110 + scrollY + 'px';
                tooltip.style.left = rect.left + 300 - tooltip.offsetWidth + 'px'; // Ajuste para a esquerda
            });


            let tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.parentNode.removeChild(tooltip);
            }
            upgradeElement.addEventListener('mouseleave', () => {
                tooltip = document.querySelector('.custom-tooltip');
                if (tooltip) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            });

            let Disponivel8002;
            if (upgrade.Comprado) {
                Disponivel8002 = "Adquiridos"
            }

            upgradeElement.innerHTML = `
                <div class="p-2 bg-dark-subtle border rounded-1 mb-2 position-relative">
                    <h5 class="position-absolute text-start mx-auto text-black" style="left:80px; top: 5px;">${upgrade.nome}</h5>
                    <p id="upgradetext${index}" class="position-absolute fs-6 fst-italic fw-semibold text-bg-dark" style="left:80px; bottom: -5px;">${formatarNumero(upgrade.cost)}</p>
                    <p class="position-absolute text-black fs-5 fst-italic fw-bolder" style="right: 15px; bottom: -5px;">${Disponivel8002}</p>
                    <img class="" src="${upgrade.img}" width="60px" height="60px">
                    <img src="certo.jpg" alt="Ícone Certo" class="imagem-certo upgrade-comprado" style="top:11px;left:9px;" width="55px" height="55px">
                    </div>
            `;


            tiposUnicosUpgradesVariable.forEach((upgrad, index) => {
                if (upgrad == upgrade.tipo) {
                    document.getElementById('ContainerUp' + upgrad).appendChild(upgradeElement);
                }
            })

        });

    }

    MostraConstrucaoDiv() {

        const upgradesContainer = document.getElementById("upgrades-container");

        upgradesContainer.innerHTML = "";

        const upgradesContainer2 = document.getElementById("header")

        upgradesContainer2.innerHTML = "";

        let meta = 1; // Defina a meta inicial
        let previousUpgradeElement = null; // Referência para o elemento da div anterior

        this.buildingsLiberadas.forEach((upgrade, index) => {

            const nextUpgradeIndex = this.buildings.findIndex(building => building === upgrade) + 1;
            const nextUpgrade = this.buildings[nextUpgradeIndex];

            const upgradeElement = document.createElement("div");
            upgradeElement.className = "p-1 border border-2 rounded-1 cordofundoup border-opacity-50 transition-bg position-relative m-1 upgrade-container";
            if (window.innerWidth > 920) {
                upgradeElement.style.width = "48%"
            } else {
                upgradeElement.style.width = "100%"
            }

            upgradeElement.style.minHeight = "232px"
            upgradeElement.id = "upgradejs";
            let especial = false
            if (upgrade.name === 'Auxilio Emergencial' && this.especial.auxilio) { especial = true }
            if (upgrade.name === 'Carabina' && this.especial.carabina) { especial = true }


            upgradeElement.innerHTML = `
            <div class="d-flex justify-content-start align-items-center">
                <h4 class="tituloconstrucao text-center text-bg-dark mx-auto" style="margin-bottom:10px;">${upgrade.name}</h4>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="d-flex align-items-center">
                        <img src="${upgrade.img}" class="img-fluid me-3 ms-3 border border-1 border-dark" style="width: 100px; height:80px;">
                        <p class="precoconstrucao fs-3 fw-semibold m-0 border-bottom border-1 border-black" style="text-shadow: 1px 1px 2px rgb(0, 0, 0), 0 0 1em rgb(0, 0, 0), 0 0 0.2em rgb(0, 0, 0);"><span id="custocostrucao${index}" ">P$: ${formatarNumero(upgrade.custCalculado)}</span></p>
                </div>
                <p class="quantconstrucao fs-1 m-0 me-2 text-light" style="text-shadow: 2px 1px 3px rgba(66, 66, 66, 0.575), 0 0 1em rgb(0, 128, 255), 0 0 0.2em rgb(0, 128, 255);">${upgrade.quantidade}</p>
            </div>

        <button class="btn btn-success col-7" id="Adquirir">Adquirir</button>
        ${especial == true ? '<button class="btn col-4" style="background-color: rgba(33, 1, 109, 0.687);color:wheat;" data-bs-toggle="modal" data-bs-target="#statsModal" onclick="mostrarEstatisticas('+index+')" >Especial</button>' : '<button class="btn btn-danger col-4" disabled>Vender</button>'}
        <button class="btn btn-warning col-11 mt-1 mb-1" type="button" ${upgrade.MostraInfo()} data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapseExample">
              Info
        </button>
        <div class="collapse ${showw(upgrade)}" id="collapse${index}">
            <div class="card card-body text-bg-warning border-3 fw-semibold mt-1 m-auto col-11 text-start">
                <p class="mb-0">* Cada <b>${upgrade.name}</b> gera <b>${formatarNumero(upgrade.power)}</b> por segundo<br>
                * Todas geram <b>${formatarNumero(upgrade.MostraTotalpps())}</b> por segundo<br>
                *  Equivale há <b>${upgrade.MostraPorcentagem()}%</b> da sua produçao total
                </p>
            </div>
        </div>
`;

            upgradeElement.querySelector(".btn-success").addEventListener("click", () => {

                upgrade.CompraBuilding();

                this.AtualizaEspecial()
                this.MostraConstrucaoDiv();
                this.Mudarcordocustodasconstrucao();

            });

            upgradeElement.querySelector(".btn-warning").addEventListener("click", () => {

                let elementos = upgradesContainer.querySelectorAll(".btn-warning");
                let elementos2 = upgradesContainer.querySelectorAll(".btn-success");

                for (var i = 0; i < elementos.length; i++) {
                    elementos[i].disabled = true;
                    elementos2[i].disabled = true;
                }


                setTimeout(() => {
                    const isCollapsed = upgradeElement.querySelector(".collapse").classList.contains("show");
                    if (isCollapsed) {
                        // Configura a propriedade isCollapseVisible
                        upgrade.isCollapseVisible = true;
                    } else {
                        upgrade.isCollapseVisible = false;
                    }
                    for (var i = 0; i < elementos.length; i++) {
                        elementos[i].disabled = false;
                        elementos2[i].disabled = false;
                    }
                }, 500)

            })

            function showw(upgrade) {
                // Retorna "show" ou "" com base no estado
                return upgrade.isCollapseVisible ? "show" : "";
            }

            const proxupgradeElement = document.createElement("div");
            proxupgradeElement.style.width = "100%"

            // Verifica se a meta foi atingida e o próximo upgrade existe
            if (nextUpgrade) {
                meta = nextUpgrade.costUnlock; // Atualiza a meta para o próximo upgrade
                proxupgradeElement.innerHTML = `
                <div class=" mx-1 px-2 rounded-1 border border-1 border-dark border-opacity-75 transition-bg upgrade-container cordofundoup2 " style="height: 84px;top:0; right:0;">
                <h6 class=" mb-0">Próximo upgrade:<br><span class="text-bg-info">${nextUpgrade.name}</h6>
                  <p class="fs-6 mb-0 mt-0">Custo: <span class="text-bg-danger fw-bold">${formatarNumero(nextUpgrade.costUnlock)}</span> Pontos Acumulados</p>

                  <div class="progress col-11 m-auto rounded-0 mb-1" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 2px">
                  <div class="progress-bar bg-warning progress-bar-animated progress-bar-striped" style="width: ${nextUpgrade.MostraQuantoFaltaPorcentagem()}%"></div>
                </div>

                </div>`;
            } else {
                proxupgradeElement.innerHTML = `    <div class=" mx-1 px-2 rounded-1 border border-1 border-dark border-opacity-75 transition-bg upgrade-container cordofundoup2" style="height: 84px;top:0; right:0;">
                                                        <h5 class="m-0">Parabens voc~e é um inutil <3</h5>
                                                    </div>`;
            }

            setInterval(() => {
                // ... (lógica de atualização)

                // Se houver um próximo upgrade
                if (nextUpgrade) {

                    const progressBar = proxupgradeElement.querySelector(".progress-bar");
                    const progressValue = nextUpgrade.MostraQuantoFaltaPorcentagem();
                    progressBar.style.width = progressValue + "%";
                }
            }, 200);

            upgradesContainer.appendChild(upgradeElement);

            if (previousUpgradeElement) {

                upgradesContainer2.removeChild(previousUpgradeElement);

            }

            upgradesContainer2.appendChild(proxupgradeElement);

            previousUpgradeElement = proxupgradeElement;

        });
        this.Mudarcordocustodasconstrucao()
    }

    Mudarcordocustodasconstrucao() {
        this.buildingsLiberadas.forEach((upgrade, index) => {
            if (game.pontos >= upgrade.custCalculado) {
                document.getElementById("custocostrucao" + index).style.color = "white"
            } else {
                document.getElementById("custocostrucao" + index).style.color = "red"
            }
        })
        this.upgradesLiberados.forEach((upgrade, index) => {
            const element = document.getElementById("upgradetext" + index);
            if (element) {
                if (this.pontos >= upgrade.cost) {
                    element.style.color = "darkgreen";
                } else {
                    element.style.color = "red";
                }
            }
        })
    }
    AtualizaEspecial() {

        if (this.especial.carabina > 0) {
            this.buildings[0].poweradd = ((this.especial.carabina / 100) * (SomaQuntConstrucao() - this.buildings[0].quantidade))
            this.atualizamultiplayer()
        }
        if (this.especial.auxilio > 0) {
            let wale = 0;
            while (wale < this.especial.auxilio) {
                let wale2 = wale + 2
                this.buildings[wale2].poweradd = (this.buildings[1].quantidade * (this.buildings[wale2].powerbase * (0.01 / (wale + 1)))) * (this.multiplayer / 100)
                wale++
            }
            this.atualizamultiplayer()
        }

    }
    initializeUI() {
        //quando voce clica na imagem do bolsonaro ele chama a funçao "click();"
        document.getElementById("BOZOIMG").addEventListener("click", () => {
            this.click();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            exibirNumeroTemporario(mouseX, mouseY, this.TotalClick);
        });

        //btn salvar
        const saveBtn = document.getElementById("savebtn");
        saveBtn.addEventListener("click", () => {
            try {
                localStorage.setItem('savedojogo', this.saveGame(0));
                showToast('Jogo Salvo', 'Info');
            } catch (error) {
                alert("erro jogo nao foi salvo ")
                console.log(error)
            }
        });

        //btn enviar score
        $('#envSave').on('click', function() {
            versao()
            $.ajax({
                url: 'online.php',
                method: 'POST',
                data: {
                    dados: game.pontosAcumulados,
                    save: btoa(game.saveGame(0))
                }, // Converte o objeto JSON para uma string JSON
                success: function() {

                    localStorage.setItem('savedojogo', game.saveGame(0));
                    console.log(game.saveGame(0))
                    if (game.online.logado == true) {
                        ajaxSorebord()
                    } else {
                        showToast('Você precisa estar logado para ter acesso aos Leaderboards', 'Erro');
                    }
                },
                error: function() {
                    alert('fodeu')
                }
            });
        })

        // notas de atualisao
        if (!localStorage.getItem('modalShown')) {
            $('#staticBackdrope').modal('show');

            localStorage.setItem('modalShown', 'true');
        }

        //quando eu aperto o numero zera
        document.getElementById("nav-home-tab").addEventListener("click", () => {

            this.addmenos = this.addmenos + this.add
            this.MostraUpgradeDiv()
        });

        //btn deslogar
        $('#Btn-Deslogar').on('click', function() {
            $.ajax({
                url: '../../deslogar.php',
                method: 'GET',
                data: { dados: document.URL }, // Converte o objeto JSON para uma string JSON
                success: function() {
                    showToast('Você Deslogou com Sucesso', 'Alerta');
                },

                error: function() {
                    alert('fodeu')
                }
            });
        })
    }
    updateUI() {

        document.getElementById("PontosD").innerText = formatarNumero(this.pontos);
        document.getElementById("PPsD").innerText = formatarNumero(this.PPs.toFixed(1));
        document.getElementById("MltD").innerText = formatarNumero(this.multiplayer.toFixed(1));
        //console.log(this.PPs)

        this.Mudarcordocustodasconstrucao()

    }
    atualizamultiplayer(a, b, c) {
        this.buildings.forEach(building => {
            building.ModificaPower();
        });

        const poderTotalAoCarregar = this.buildings.reduce((total, building) => total + (building.power * building.quantidade), 0);
        this.PPs = poderTotalAoCarregar;
        if (c == 'nao') { a = false }
        if (a) {
            let depois = this.multiplayer;
            let depoisP = this.PPs;
            showToast('Seu multiplicador aumentou de: ' + a.toFixed(0) + '%, para: ' + depois.toFixed(0) + '% .Resultando em uma aumento na produçao de: ' + formatarNumero(depoisP - b), 'Multiplicador')
        }
    }
}


// Definição da classe Building
class Building {
    constructor(gameInstacia, name, cost, costUnlock, power, img, Mc) {
            this.img = img;
            this.gameInstacia = gameInstacia;
            this.name = name;
            this.cost = cost;
            this.costUnlock = costUnlock;
            this.quantidade = 0;
            this.Desbloqueado = false;
            this.isCollapseVisible = false;
            this.powerbase = power;
            this.poweradd = 0;
            this.power = this.ModificaPower();
            this.multiplicadorBuild = 100;
            if (Mc) {
                this.multiplicadorCusto = Mc + 100;
            } else {
                this.multiplicadorCusto = 100;
            }
            this.custCalculado = this.ModificaCusto();
        }
        //metodos de salvamento e carregamento de dados
    saveBuilding() {
        return {
            name: this.name,
            costUnlock: this.costUnlock,
            quantidade: this.quantidade,
            custCalculado: this.custCalculado,
            Desbloqueado: this.Desbloqueado,
        };
    }
    static loadBuilding(data, existingBuilding) {
        if (existingBuilding) {
            existingBuilding.name = data.name;
            existingBuilding.costUnlock = data.costUnlock;
            existingBuilding.quantidade = data.quantidade;
            existingBuilding.custCalculado = data.custCalculado;
            existingBuilding.Desbloqueado = data.Desbloqueado;

            return existingBuilding;
        }
    }


    CompraBuilding() {
        if (this.gameInstacia.pontos >= this.custCalculado) {
            this.Desbloqueado = true;
            this.gameInstacia.pontos -= this.custCalculado;
            this.quantidade++;
            this.custCalculado = this.ModificaCusto();


            this.gameInstacia.PPs += this.power; //essa linha aqui add o poder

            this.gameInstacia.updateUI();
            console.log("comprou: " + this.name + " Agora voce tem: " + this.quantidade);
        } else {
            console.log("nao comprou");
        }
    }


    ModificaCusto() {
        return parseFloat((this.cost * (Math.pow(1.14 * (this.multiplicadorCusto / 100), this.quantidade))).toFixed(0));
    }
    ModificaPower() {
        console.log(this.poweradd)
        return parseFloat((this.power = (this.powerbase * (this.gameInstacia.multiplayer / 100) + this.poweradd)));
    }
    MostraTotalpps() {
        return (this.power * this.quantidade).toFixed(2);
    }
    MostraPorcentagem() {
        if (this.gameInstacia.PPs == 0) {
            return 0
        } else {
            return parseFloat(((this.MostraTotalpps() / this.gameInstacia.PPs) * 100).toFixed(1))
        }
    }
    MostraInfo() {
        if (this.Desbloqueado == false) {
            return "disabled"
        }
    }
    MostraQuantoFaltaPorcentagem() {
        return parseFloat((this.gameInstacia.pontosAcumulados / this.costUnlock) * 100)
    }
}
var tiposUnicosUpgradesVariable = [];
class Upgrade {
    constructor(gameInstacia, nome, cost, costUnlock, efeito, img, desc, info) {
            this.img = img;
            this.gameInstacia = gameInstacia;
            this.nome = nome;
            this.cost = cost;
            this.costUnlock = costUnlock;
            this.efeito = efeito;
            this.Desbloqueado = false;
            this.Comprado = false;
            this.desc = desc;
            this.info = info;
            this.tipo = this.AplicaTipo();

            if (!tiposUnicosUpgradesVariable.includes(this.tipo)) {
                tiposUnicosUpgradesVariable.push(this.tipo);
                tiposUnicosUpgradesVariable.sort()
            }
        }
        // Dentro da classe Upgrade
    saveUpgrade() {
        const { gameInstacia, ...serializedUpgrade } = this;
        return {
            nome: this.nome,
            cost: this.cost,
            costUnlock: this.costUnlock,
            efeito: this.efeito,
            Desbloqueado: this.Desbloqueado,
            Comprado: this.Comprado,
        };
    }


    static loadUpgrade(savedData, existingUpgrade) {
        if (existingUpgrade) {
            existingUpgrade.nome = savedData.nome;
            existingUpgrade.cost = savedData.cost;
            existingUpgrade.costUnlock = savedData.costUnlock;
            existingUpgrade.efeito = savedData.efeito;
            existingUpgrade.Desbloqueado = savedData.Desbloqueado;
            existingUpgrade.Comprado = savedData.Comprado;
        }
    }
    CompraUpgrade() { //compra construçao
        if (this.gameInstacia.pontos >= this.cost) { //verifica se pode comprar
            console.log("\n comprou up")
            this.Comprado = true;
            this.gameInstacia.pontos -= this.cost; //diminui do valor de pontos
            this.AplicaUp()
        }
    }
    AplicaUp(x) { //aplica up e verifica qual efeito ele da
        if (this.efeito.Construcao) {
            this.gameInstacia.buildings[this.efeito.Alvo].powerbase *= this.efeito.Construcao //melhora a construçao
            this.gameInstacia.atualizamultiplayer();
        }
        if (this.efeito.click && this.efeito.Alvo == "A") {
            this.gameInstacia.variaveisDeClick.poderdoclick += this.efeito.click //adiciona ponto do click
        }
        if (this.efeito.click && this.efeito.Alvo == "M") {
            this.gameInstacia.variaveisDeClick.poderdoclickporcentro += this.efeito.click
        }
        if (this.efeito.click && this.efeito.Alvo == "P") {
            this.gameInstacia.variaveisDeClick.poderdoclickIntegro += this.efeito.click
            this.gameInstacia.variaveisDeClick.poderdoclickPor += this.efeito.clickP
        }


        if (this.efeito.carabina) {
            this.gameInstacia.especial.carabina += this.efeito.carabina
            this.gameInstacia.buildings[0].poweradd = ((this.gameInstacia.especial.carabina / 100) * (SomaQuntConstrucao() - this.gameInstacia.buildings[0].quantidade))
            this.gameInstacia.atualizamultiplayer();
        }
        if (this.efeito.auxilio) {
            this.gameInstacia.especial.auxilio += this.efeito.auxilio
            this.gameInstacia.atualizamultiplayer();
        }
        if (this.efeito.multiplayer) {
            let antes = this.gameInstacia.multiplayer;
            let antespontos = this.gameInstacia.PPs;
            this.gameInstacia.multiplayer += (this.gameInstacia.multiplayer * (this.efeito.multiplayer / 100));
            this.gameInstacia.atualizamultiplayer(antes, antespontos, x);
        }
    }
    AplicaTipo() {
        if (this.efeito.Construcao) {
            return '1 - Construçoes'
        }
        if (this.efeito.click) {
            return '2 - Clique'
        }
        if (this.efeito.multiplayer && !this.efeito.Construcao) {
            return '3 - Multiplayer'
        }
    }
    Desbloqueadoo() {
        if (this.efeito.Construcao && this.gameInstacia.buildings[this.efeito.Alvo].quantidade >= this.costUnlock && !this.efeito.auxilio) {
            return true
        }
        if (this.efeito.click && this.gameInstacia.PPs >= this.costUnlock) {
            return true
        }
        if (this.efeito.multiplayer && this.gameInstacia.pontosAcumulados > this.costUnlock && !this.efeito.Construcao) {
            return true
        }
        if (this.efeito.auxilio && this.gameInstacia.buildings[this.efeito.AlvoAux].quantidade >= 5) {
            return true
        }
        return false;
    }
}
const game = new Game();

setTimeout(game.loadGame.bind(game), 1000);

game.buildings.push(new Building(game, 'Carabina', 22, 1, 0.2, "img/icons/Construcoes/carabina.png"));
game.buildings.push(new Building(game, 'Auxilio Emergencial', 100, 10, 1, "img/icons/Construcoes/auxilio-emergencial.jpg"));
game.buildings.push(new Building(game, 'Leite Condensado', 1050, 150, 8, "img/icons/Construcoes/Leite-condensado.jpg"));
game.buildings.push(new Building(game, 'Cloroquila', 13000, 1500, 52, "img/icons/Construcoes/cloroquila.jpg"));
game.buildings.push(new Building(game, 'Fake news', 123000, 300000, 312, "img/icons/Construcoes/fakenews.jpeg"));
game.buildings.push(new Building(game, 'Nordeste', 1007022, 7000000, 1872, "img/icons/Construcoes/nordeste.jpg"));
game.buildings.push(new Building(game, 'greve dos caminhoneiros', 25008528, 168000000, 7488, "img/icons/Construcoes/greve.webp"));
game.buildings.push(new Building(game, 'Bolsonaro Old', 500170560, 4032000000, 44928, "img/icons/Construcoes/bolsonaroOld.jpg"));
game.buildings.push(new Building(game, 'Medicos Comunistas', 10003411200, 28224000000, 269568, "img/icons/Construcoes/medicosComunistas.webp"));
game.buildings.push(new Building(game, 'Concresso', 75003411200, 197568000000, 5201420, "img/icons/Construcoes/Concresso.jpeg", 25));

game.upgrades.push(new Upgrade(game, 'Gatilho Imbrochável', 517, 10, { click: 1, Alvo: "A" }, "img/icons/upgrades/Click/imbroxavel.jpg", '&quot;fuzilar a petralhada&quot;', 'Dobra o click'))
game.upgrades.push(new Upgrade(game, '5 milimetros', 5777, 20, { click: 2, Alvo: "A" }, "img/icons/upgrades/Click/imbroxavelinvert.jpg", '&quot;fuzilar a petralhada&quot;', 'Dobra o dobro'))
game.upgrades.push(new Upgrade(game, '7 milimetos', 10717, 40, { click: 4, Alvo: "A" }, "img/icons/upgrades/Click/imbroxavelinvert2.jpeg", '&quot;fuzilar a petralhada&quot;', 'Quadrilhica o dobro'))
game.upgrades.push(new Upgrade(game, 'Gatilho Lendario', 52217, 117, { click: 1, Alvo: "M" }, "img/icons/upgrades/Click/b.jpg", '&quot;Armas aprovadas na camera&quot;', 'Ganha 1% do PPs como click'))
game.upgrades.push(new Upgrade(game, 'Gatilho Le-GENDARIO', 5022017, 2017, { click: 1, Alvo: "M" }, "img/icons/upgrades/Click/c.jpeg", '&quot;Armas sem impostos&quot;', 'Ganha 1% do PPs como click'))
game.upgrades.push(new Upgrade(game, 'Crianças armadas', 75020170, 95800, { click: 2, Alvo: "M" }, "img/icons/upgrades/Click/d.jpg", '&quot;Crianças sao permitidas de armas&quot;', 'Ganha 2% do PPs como click'))
game.upgrades.push(new Upgrade(game, 'Crianças armadas2', 750201700, 1000000, { clickP: 25, click: 20000, Alvo: "P" }, "img/icons/upgrades/Click/d.jpg", '&quot;Crianças sao permitidas de armas&quot;', 'Ganha 2% do PPs como click'))

game.upgrades.push(new Upgrade(game, 'Armando a populazao.', 151.7, 1, { Construcao: 2.5, Alvo: 0 }, "img/icons/upgrades/Cartucho-Carabina/cartuxodecarabinaN2.png", '&quot;Bolsonaro começa a distribuir armas para burguesia&quot;', 'Dobra a produção da carabina'))
game.upgrades.push(new Upgrade(game, 'Cartuxo De Carabina.', 4517, 15, { Construcao: 4, Alvo: 0 }, "img/icons/upgrades/Cartucho-Carabina/cartuxodecarabinaN3.png", '&quot;Fica mais eficiente se você conseguir atirar&quot;', 'Multiplica a produçao de ' + game.buildings[0].name + 'por 3 vezes'))
game.upgrades.push(new Upgrade(game, 'Carabina com mira 2x2', 100000, 25, { Construcao: 5.5, Alvo: 0, carabina: 10 }, "img/icons/upgrades/Cartucho-Carabina/cartuxodecarabinaN4.png", '&quot;Consegue atirar de longe&quot;', 'Multiplica a produçao de ' + game.buildings[0].name + 'por 4 vezes e add mais 10% por cada construçao possuida'))
game.upgrades.push(new Upgrade(game, 'Carabina com mira 4x2', 15000000, 50, { Construcao: 6.5, Alvo: 0, carabina: 50 }, "img/icons/upgrades/Cartucho-Carabina/cartuxodecarabinaN5.png", '&quot;Consegue mirar ate a puta que te pariu&quot;', 'Multiplica a produçao de ' + game.buildings[0].name + 'por 5 vezes e 50%'))
game.upgrades.push(new Upgrade(game, 'Carabina com mira 8x2', 450000000, 100, { Construcao: 7.5, Alvo: 0, carabina: 210 }, "img/icons/upgrades/Cartucho-Carabina/cartuxodecarabinaN6.png", '&quot;Vai ate a casa do caralho&quot;', 'Multiplica a produçao de ' + game.buildings[0].name + 'por 6 vezes 150%'))
game.upgrades.push(new Upgrade(game, 'Carabina com mira 16x2', 10000000000, 150, { Construcao: 8.5, Alvo: 0, carabina: 1100 }, "img/icons/upgrades/Cartucho-Carabina/cartuxodecarabinaN7.png", '&quot;Da a volta na terra 10 vezes&quot;', 'Multiplica a produçao de ' + game.buildings[0].name + 'por 7 vezes e 300%'))
game.upgrades.push(new Upgrade(game, 'Carabina com mira 32x2', 100000000000, 200, { Construcao: 9.5, Alvo: 0, carabina: 5250 }, "img/icons/upgrades/Cartucho-Carabina/cartuxodecarabinaN7.png", '&quot;Da a volta na terra 10 vezes&quot;', 'Multiplica a produçao de ' + game.buildings[0].name + 'por 7 vezes e 300%'))

game.upgrades.push(new Upgrade(game, 'Melhor que bolsa Familia..', 1930, 5, { Construcao: 2, Alvo: 1 }, "img/icons/upgrades/Alixilio/b.jpg", '&quot;agora da pra compra uma calça para uma garota de 16 anos&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + '2 vezes'))
game.upgrades.push(new Upgrade(game, 'Agora, pobres sao cidadoes..', 9650, 15, { Construcao: 2.5, Alvo: 1 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 2.5'))
game.upgrades.push(new Upgrade(game, 'pobres dominam as ruas.', 5965000, 75, { Construcao: 5, Alvo: 1 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 2.5'))
game.upgrades.push(new Upgrade(game, 'Pobres pobres pobres...', 3256875000, 125, { Construcao: 5, Alvo: 1 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 2.5'))

game.upgrades.push(new Upgrade(game, 'Auxilia tudo.', 96500, 25, { Construcao: 2, Alvo: 1, auxilio: 1, AlvoAux: 2 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 3'))
game.upgrades.push(new Upgrade(game, 'Auxilio divino.', 965000, 50, { Construcao: 2, Alvo: 1, auxilio: 1, AlvoAux: 3 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 3'))
game.upgrades.push(new Upgrade(game, 'Auxilia a fake news.', 14475000, 75, { Construcao: 2, Alvo: 1, auxilio: 1, AlvoAux: 4 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 3'))
game.upgrades.push(new Upgrade(game, 'Auxilia o nordeste.', 217125000, 100, { Construcao: 2, Alvo: 1, auxilio: 1, AlvoAux: 5 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 3'))
game.upgrades.push(new Upgrade(game, 'Auxilia a greve.', 3256875000, 125, { Construcao: 2, Alvo: 1, auxilio: 1, AlvoAux: 6 }, "img/icons/upgrades/Alixilio/c.jpg", '&quot;Pobre mamam o bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[1].name + 'por 3'))

game.upgrades.push(new Upgrade(game, 'hmmm gotoso', 20220, 5, { Construcao: 2, Alvo: 2 }, "img/icons/upgrades/leitecondensado/a.jpg", '&quot;Da pra fazer brigadeiro&quot;', 'Multiplica a produçao de ' + game.buildings[2].name + ' por 2 '))
game.upgrades.push(new Upgrade(game, 'Brigadeiro recheado', 101100, 15, { Construcao: 2.5, Alvo: 2 }, "img/icons/upgrades/leitecondensado/a.jpg", '&quot;Da pra fazer brigadeiro&quot;', 'Multiplica a produçao de ' + game.buildings[2].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Militares Condensados', 1011000, 25, { Construcao: 2.5, Alvo: 2 }, "img/icons/upgrades/leitecondensado/c.jpg", '&quot;Da pra fazer brigadeiro&quot;', 'Multiplica a produçao de ' + game.buildings[2].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Militares Condensados2', 10110000, 50, { Construcao: 2.5, Alvo: 2 }, "img/icons/upgrades/leitecondensado/c.jpg", '&quot;Da pra fazer brigadeiro&quot;', 'Multiplica a produçao de ' + game.buildings[2].name + ' por 2.5 '))

game.upgrades.push(new Upgrade(game, 'Toma e confia', 250000, 5, { Construcao: 2, Alvo: 3 }, "img/icons/upgrades/cloroquina/a.webp", '&quot;Ao tempo em que expôs sua opinião sobre o potencial auxílio da hidroxicloroquina e da ivermectina para evitar ao menos 140 mil mortes de brasileiros decorrentes do novo coronavírus, pontuou que o uso medicamentoso ainda pendia de comprovação médico-científica&quot;', 'Multiplica a produçao de ' + game.buildings[3].name + ' por 2 '))
game.upgrades.push(new Upgrade(game, 'Confia e toma', 1250000, 15, { Construcao: 2.5, Alvo: 3 }, "img/icons/upgrades/cloroquina/b.jpeg", '&quot;Cloroquina não tem efeito colateral afirma Bolsonaro&quot;', 'Multiplica a produçao de ' + game.buildings[3].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Comprovaçao falsa', 12500000, 25, { Construcao: 2.5, Alvo: 3 }, "img/icons/upgrades/cloroquina/c.jpg", '&quot;Com recomendaçao medica falsa&quot;', 'Multiplica a produçao de ' + game.buildings[3].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Comprovaçao falsa2', 125000000, 50, { Construcao: 2.5, Alvo: 3 }, "img/icons/upgrades/cloroquina/c.jpg", '&quot;Com recomendaçao medica falsa&quot;', 'Multiplica a produçao de ' + game.buildings[3].name + ' por 2.5 '))

game.upgrades.push(new Upgrade(game, 'Folha de sp', 2360000, 5, { Construcao: 2, Alvo: 4 }, "img/icons/upgrades/fakenews/a.jpeg", '&quot;FAKEE NEWS TA OK!? &quot;', 'Multiplica a produçao de ' + game.buildings[4].name + ' por 2 '))
game.upgrades.push(new Upgrade(game, 'Rachadinha', 11800000, 15, { Construcao: 2.5, Alvo: 4 }, "img/icons/upgrades/fakenews/b.jpg", '&quot;RACHADINHA ÉEEEEE FAKEE NEWS, TA OK!? &quot;', 'Multiplica a produçao de ' + game.buildings[4].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Chefe e porta-voz', 118000000, 25, { Construcao: 2.5, Alvo: 4 }, "img/icons/upgrades/fakenews/c.jpeg", '&quot;Organização que espalha fake news pelo Brasil&quot;', 'Multiplica a produçao de ' + game.buildings[4].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Chefe e porta-voz2', 1180000000, 50, { Construcao: 2.5, Alvo: 4 }, "img/icons/upgrades/fakenews/c.jpeg", '&quot;Organização que espalha fake news pelo Brasil&quot;', 'Multiplica a produçao de ' + game.buildings[4].name + ' por 2.5 '))

game.upgrades.push(new Upgrade(game, 'Nordeste explusoo', 19400000, 5, { Construcao: 2, Alvo: 5 }, "img/icons/upgrades/nordeste/a.jpg", '&quot;Bolsonaro expulsa o nordeste e agora o idh subiu em 700% &quot;', 'Multiplica a produçao de ' + game.buildings[5].name + ' por 2 '))
game.upgrades.push(new Upgrade(game, 'Aguaa pro nordeste', 97000000, 15, { Construcao: 2.5, Alvo: 5 }, "img/icons/upgrades/nordeste/b.jpg", '&quot;Bolsonaro coloca agua no nordeste e ele volra pro brazil &quot;', 'Multiplica a produçao de ' + game.buildings[5].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Chega energia pro nordeste', 970000000, 25, { Construcao: 2.5, Alvo: 5 }, "img/icons/upgrades/nordeste/Arte.webp", '&quot;É descobnerto energia e o bolsonaro ganha fãs&quot;', 'Multiplica a produçao de ' + game.buildings[5].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Chega energia pro nordeste2', 9700000000, 50, { Construcao: 2.5, Alvo: 5 }, "img/icons/upgrades/nordeste/Arte.webp", '&quot;É descobnerto energia e o bolsonaro ganha fãs&quot;', 'Multiplica a produçao de ' + game.buildings[5].name + ' por 2.5 '))

game.upgrades.push(new Upgrade(game, 'Greve do disel', 481500000, 5, { Construcao: 2, Alvo: 6 }, "img/icons/upgrades/caminhoneiros/1.jpeg", '&quot;Preços aumentam e o bolsonaro lucra mais&quot;', 'Multiplica a produçao de ' + game.buildings[6].name + ' por 2 '))
game.upgrades.push(new Upgrade(game, 'Greve do alcool', 2407500000, 15, { Construcao: 2.5, Alvo: 6 }, "img/icons/upgrades/caminhoneiros/2.jpg", '&quot;Bolsonaro tira os impostos do disel&quot;', 'Multiplica a produçao de ' + game.buildings[6].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Greve dos professores', 20407500000, 25, { Construcao: 2.5, Alvo: 6 }, "img/icons/upgrades/caminhoneiros/3.jpeg", '&quot;Professores tiram salario do neymar&quot;', 'Multiplica a produçao de ' + game.buildings[6].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Greve dos professores2', 204075000000, 50, { Construcao: 2.5, Alvo: 6 }, "img/icons/upgrades/caminhoneiros/3.jpeg", '&quot;Professores tiram salario do neymar&quot;', 'Multiplica a produçao de ' + game.buildings[6].name + ' por 2.5 '))

game.upgrades.push(new Upgrade(game, 'Vagabunda', 9630000000, 5, { Construcao: 2, Alvo: 7 }, "img/icons/upgrades/bolsonaroold/bolsonaro_maria.jpg", '&quot;VAGABUNDA 😡🤬&quot;', 'Multiplica a produçao de ' + game.buildings[7].name + ' por 2 '))
game.upgrades.push(new Upgrade(game, 'Da que eu te dou outra', 48150000000, 15, { Construcao: 2.5, Alvo: 7 }, "img/icons/upgrades/bolsonaroold/bolsonaro_maria.jpg", '&quot; DA QUE EU TE DOU OUTRA!!!! 😡🤬&quot;', 'Multiplica a produçao de ' + game.buildings[7].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Voce nao merece[...]', 481500000000, 25, { Construcao: 2.5, Alvo: 7 }, "img/icons/upgrades/bolsonaroold/bolsonaro_maria.jpg", '&quot; TA OK?!!!! 😡🤬&quot;', 'Multiplica a produçao de ' + game.buildings[7].name + ' por 2.5 '))

game.upgrades.push(new Upgrade(game, 'mIDicOS cuMAs!!', 192600000000, 5, { Construcao: 2, Alvo: 8 }, "img/icons/upgrades/medicoscomunas/1.avif", '&quot;Medicos Comunistas&quot;', 'Multiplica a produçao de ' + game.buildings[8].name + ' por 2 '))
game.upgrades.push(new Upgrade(game, 'nao agunto mais progamar!!', 963000000000, 15, { Construcao: 2.5, Alvo: 8 }, "img/icons/upgrades/medicoscomunas/30542851768_ce4e34bfaf_o.png", '&quot;DA QUE EU T DOU OUTRA 😡🤬&quot;', 'Multiplica a produçao de ' + game.buildings[8].name + ' por 2.5 '))
game.upgrades.push(new Upgrade(game, 'Medicos Infiltados', 963000000000, 25, { Construcao: 2.5, Alvo: 8 }, "img/icons/upgrades/medicoscomunas/c.jpg", '&quot;Medicos enfiltrados para roubar informaçoes&quot;', 'Multiplica a produçao de ' + game.buildings[8].name + ' por 2.5 '))

Armas();
//multiplica a buld por 20 e divide por 5 e depois multiplica pela quantidade de build
function Armas() {
    let UpQuantMulArmas = 0
    let CustoInicial = 50
    CriaUp({
        nome: 'Pistola.',
        tipo: 'Arma',
        UpMulArmas: 1,
        power: 1,
    });
    CriaUp({
        nome: '38.',
        tipo: 'Arma',
        UpMulArmas: 1.5,
        power: 1,
    });
    CriaUp({
        nome: '.30.',
        tipo: 'Arma',
        UpMulArmas: 2,
        power: 1,
    });
    CriaUp({
        nome: 'Ak47.',
        tipo: 'Arma',
        UpMulArmas: 3,
        power: 3,
    });
    CriaUp({
        nome: 'p90.',
        tipo: 'Arma',
        UpMulArmas: 3,
        power: 3,
    });
    CriaUp({
        nome: 'uzi.',
        tipo: 'Arma',
        UpMulArmas: 3,
        power: 3,
    });
    CriaUp({
        nome: 'm4.',
        tipo: 'Arma',
        UpMulArmas: 4,
        power: 2,
    });
    CriaUp({
        nome: 'mp40.',
        tipo: 'Arma',
        UpMulArmas: 5,
        power: 2,
    });
    CriaUp({
        nome: 'AWM.',
        tipo: 'Arma',
        UpMulArmas: 6,
        power: 5,
    });
    CriaUp({
        nome: 'Arma de brinquedo.',
        tipo: 'Arma',
        UpMulArmas: 7,
        power: 2,
    });
    CriaUp({
        nome: 'Accuracy International AS50.',
        tipo: 'Arma',
        UpMulArmas: 8,
        power: 2,
    });
    CriaUp({
        nome: 'Beretta BM 59.',
        tipo: 'Arma',
        UpMulArmas: 8,
        power: 2,
    });
    CriaUp({
        nome: '3 oitao.',
        tipo: 'Arma',
        UpMulArmas: 9,
        power: 10,
    });
    CriaUp({
        nome: 'Smith & Wesson M&P15.',
        tipo: 'Arma',
        UpMulArmas: 11,
        power: 2,
    });
    CriaUp({
        nome: 'Barrett M95.',
        tipo: 'Arma',
        UpMulArmas: 11,
        power: 2,
    });

    function CriaUp({ nome, custo, tipo, UpMulArmas, img, desc, power }) {

        let imgFinal
        let multiplicador;
        if (tipo == 'Arma') {
            UpQuantMulArmas++

            imgFinal = 'Armas/' + UpQuantMulArmas + '.png'

            Fcusto = 1000 * CustoInicial;
            if (UpMulArmas > 1) {
                let m5 = Math.ceil((UpMulArmas - 1) / 2)
                let m2 = (UpMulArmas - 1) - m5;
                Fcusto *= ((2 * m2) + (5 * m5)) * (2.65 ** UpMulArmas);
            }

            console.log(`Para UpQuantMulArmas = ${UpQuantMulArmas}, o custo é ${Fcusto}`);

            game.upgrades.push(new Upgrade(game, nome, Fcusto * 20, Fcusto * 10, { multiplayer: power }, "img/icons/upgrades/" + imgFinal, '&quot;É perigoso na mão de crianças, cuidado&quot;', 'Multiplica a produçao em ' + power + '%'))
        }
    }
}



setInterval(() => game.VerificaConstrucao(), 1000);

setInterval(ajaxSorebord, 5000)

document.getElementById("PontosAcumuladosD").innerText = formatarNumero(game.pontosAcumulados);
setInterval(function() {
    document.getElementById("PontosAcumuladosD").innerText = formatarNumero(game.pontosAcumulados);
}, 1000);

function formatarNumero(numero) {
    numero = parseFloat(numero)

    const escalas = ['', 'Milhão', 'Bilhão', 'Trilhão', 'Quadrilhão', 'Quintilhão', 'Sextilhão', 'Septilhão', 'Octilhão', 'Nonilhão', 'Decilhão'];
    let escalaIndex = 0;

    while (numero >= 1000 && escalaIndex < escalas.length) {
        numero /= 1000;
        escalaIndex++;
    }
    let resutfloat = parseFloat(numero.toFixed(2)).toLocaleString('pt-BR');
    if (escalaIndex > 0) {
        if (escalaIndex == 1) {
            resutfloat = numero.toFixed(3) + ' ' + escalas[escalaIndex - 1];
        } else {
            resutfloat = numero.toFixed(2) + ' ' + escalas[escalaIndex - 1];
        }

    }
    return resutfloat
}

function exibirNumeroTemporario(x, y, numero) {
    const numeroTemporario = document.createElement("div");
    numeroTemporario.className = "numero-temporario";
    numeroTemporario.style.left = x - ((Math.random() * 6)) - 50 + "px";
    numeroTemporario.style.top = y - ((Math.random() * 3)) - 40 + scrollY + "px";
    numeroTemporario.innerText = "+" + formatarNumero(numero);

    document.body.appendChild(numeroTemporario);

    setTimeout(() => {
        numeroTemporario.style.transition = "opacity 2s, transform 1.5s";
        numeroTemporario.style.opacity = "0";
        numeroTemporario.style.transform = "translateY(-" + (Math.random() * Math.random() * Math.random() * 600) + "px)"; // Movimento para cima
    }, 100);

    setTimeout(() => {
        document.body.removeChild(numeroTemporario);
    }, 1000);
}

function SomaQuntConstrucao() {
    let soma = 0
    game.buildings.forEach(x => {
        soma += x.quantidade
    })
    return soma
}

function showToast(message, title, autohide = true, delay = 8000) {
    // Crie um novo elemento de toast
    var toastElement = document.createElement('div');
    toastElement.classList.add('toast');
    toastElement.classList.add('mt-1');
    toastElement.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${title}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body text-light">
            ${message}
        </div>
    `;

    // Adicione o toast ao contêiner
    document.getElementById('toastContainer').appendChild(toastElement);

    toastElement.style.zIndex = '1050 !important';
    toastElement.style.visibility = 'visible';

    // Inicialize o objeto de toast do Bootstrap
    var toast = new bootstrap.Toast(toastElement, {
        autohide: autohide,
        delay: delay
    });

    // Mostre o toast
    toast.show();

    // Remova o toast do DOM após ser ocultado
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

function ajaxSorebord() {
    $.ajax({
        url: 'online.php',
        method: 'POST',
        data: { BuscaTabela: true },
        dataType: 'json',
        success: function(res) {
            if (res) {
                var tabela = $('#tabela-jogadores');
                tabela.empty(); // Limpar a tabela antes de adicionar novas linhas

                res.sort(function(a, b) {
                    let pontosA = JSON.parse(atob(a.savee)).PontosAcumulados;
                    let pontosB = JSON.parse(atob(b.savee)).PontosAcumulados;

                    return pontosB - pontosA;
                });

                // Adicionar cada elemento do array à tabela
                res.forEach(function(jogador, index) {
                    let json = JSON.parse(atob(jogador.savee));
                    let PPsd = json.PPs
                    let PontosAcumulados = json.PontosAcumulados
                    let totalBuild = json.totalBuild
                    let nome = jogador.username
                    if (nome == game.online.username) {
                        nome = '<strong class="fw-semibold">' +
                            nome + '</strong><em>(você)</em>'
                    }
                    tabela.append('<tr>' +
                        '<th scope="row">' + (index + 1) + '</th>' +
                        '<td><img id="fescura" src="' + jogador.icon + '" height="45px" class="rounded-5"></td>' +
                        '<td>' + nome + '</td>' +
                        '<td>' + formatarNumero(PontosAcumulados) + '</td>' +
                        '<td>' + formatarNumero(PPsd) + '</td>' +
                        '<td>' + formatarNumero(totalBuild) + '</td>' +
                        '</tr>');
                });

                console.log(res);
            } else {
                console.log('fodeu');
            }
        }
    });
}

function versao() {
    $.ajax({
        url: '../index.php',
        method: 'GET',
        data: 'versao',
        dataType: 'json',
        success: function(res) {
            if (res) {

                // Obtém a versão da URL usando manipulação de strings
                var url = window.location.href;
                var partes = url.split('/');

                // Encontra a parte da URL que começa com "v" (representando a versão)
                var versaoParte = partes.filter(part => part.startsWith('v'))[1];

                if (versaoParte == res) {
                    console.log('Versão:', versaoParte);
                } else {
                    showToast("Voce esta usando uma versao desatualizada: <a href='https://mckevin.lovestoblog.com/vapo/" + res + "'>Ultima versao</a>", "<h5>VERSAO DESATUALIZADA</h5>")
                }
            } else {
                console.log('Não foi possível encontrar a versão na URL.');
            }
        }
    })
}

function mostrarEstatisticas(construcao) {

    let i
    let numberOfParagraphs
    let content
    let totalbuf

    switch (construcao) {
        case 0:

            document.getElementById('statsModalBody').innerHTML = `
            
            <h6>As ${game.buildings[0].quantidade} <b>Carabinas</b> Estão com a produçao aumentada baseado na quantidade de itens que voce possui - as propias carabinas (${SomaQuntConstrucao()-game.buildings[0].quantidade})</h6>
 
            <p>Cada carabina ganha: <b>${(game.especial.carabina / 100).toFixed(2)}</b> De poder base por cada Construçao adquirida, Aumentando em um total de <b>${game.buildings[0].poweradd}</b></p>
            <p>(<b>${(game.especial.carabina / 100).toFixed(2)}</b> * <b>${SomaQuntConstrucao()-game.buildings[0].quantidade}</b> = <b>${game.buildings[0].poweradd}</b>) + <b>${game.buildings[0].powerbase.toFixed(2)}</b> = <b>${game.buildings[0].power.toFixed(2)}</b></p>
            `
            break
        case 1:
            i = 0;
            numberOfParagraphs = game.especial.auxilio;
            content = '';
            totalbuf = 0

            while (i < numberOfParagraphs) {
                i++;
                content += `<li class="p-0 m-0">${game.buildings[i+1].name}: +${formatarNumero(game.buildings[i+1].poweradd*game.buildings[i+1].quantidade)} (${(1 / (i))*game.buildings[1].quantidade}%)</li>`;
                totalbuf += game.buildings[i + 1].poweradd * game.buildings[i + 1].quantidade
            }

            document.getElementById('statsModalBody').innerHTML = `
            
            <h5>Os ${game.buildings[1].quantidade} <b>Auxilio Emergencial</b> auxilia(Buffa) ${game.especial.auxilio} ite${game.especial.auxilio > 1 ? 'ns' : 'm'}:</h5>
        
            <ol>
            ${content}
            </ol>    
        
            <h6>Aumentando em um total de: ${formatarNumero(totalbuf)} (${formatarNumero(totalbuf/game.PPs*100)}%) Do total</h6>
            `
            break
    }
}
document.getElementById("QuantasUpgradesCompradas").innerText = game.upgradesComprados.length + 1 + "/" + game.upgrades.length + " (" + ((game.upgradesComprados.length + 1) / game.upgrades.length * 100).toFixed(2) + "%)";