if (window.location.pathname !== '/') {
    $('.videoInicial').hide();
}
document.addEventListener("DOMContentLoaded", function() {


    function loadContent(path) {
        const contentDiv = $("#mainelemento");
        //alert(path)
        // Verifica qual seção deve ser carregada com base na URL
        if (path == "/") {
            contentDiv.load('naoeindex/paginaInicialMain.html')
        } else {

            $.ajax({
                url: 'naoeindex/carregaConteudo.php',
                method: 'GET',
                data: { page: path },
                dataType: 'json',
                success: function(response) {
                    contentDiv.html(`<div class='text-light my-2'>
                    <h1 class='text-center'>Bem-Vindo</h1>
                    <h3 class='text-center'>Voce esta em: ${response.titulo}</h3>
                    </div>`);
                },
                error: function() {
                    contentDiv.html("<h2>Erro</h2><p>Ocorreu um erro ao carregar a página.</p>");
                }
            });
        }
    }

    // Carregar o conteúdo inicial com base na URL atual
    loadContent(window.location.pathname);

    // Atualizar o conteúdo quando a URL mudar (navegação interna)
    document.querySelectorAll("nav a").forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            const path = this.getAttribute("href");

            // Atualiza a URL sem recarregar a página
            history.pushState({}, "", path);

            // Carrega o conteúdo da página correspondente
            loadContent(path);
        });
    });

    // Atualizar o conteúdo quando a navegação de volta ou avanço é acionada
    window.addEventListener("popstate", function() {
        loadContent(window.location.pathname);
    });
});