

#  🎮 [Bumbershoot](http://132.226.254.98)

O Bumbershoot é o meu portfólio pessoal de projetos. Inspirado na interface da Steam, ele não apenas lista meus projetos, mas permite que o usuário interaja com eles, crie perfils e salve seu progresso e pontuação.

# 💎 A Proposta
Diferente de portfólios estáticos tradicionais, o Bumbershoot foi projetado para ser um sistema interativo, nele os visitantes podem criar perfis, interagir com projetos e utilitários diretamente pelo navegador, além de poder salvar o seu progresso e pontuações de forma individual de cada site usando apenas uma conta, funcionando como uma plataforma do tipo hub interativo.

# Pagina Inicial:

<img width="825" height="406" alt="image" src="https://github.com/user-attachments/assets/48e2e961-7596-4425-85a9-7e79928d3c20" />

# Exemplo de um projeto:
<img width="1922" height="533" alt="image" src="https://github.com/user-attachments/assets/5956e864-fb86-4eb8-9b66-40a97b668da3" />


## 🏗️ Engenharia e Desafios Técnicos Resolvidos

### 1. Roteamento Client-Side (SPA Nativa)
* Implementação de uma arquitetura de **Single Page Application (SPA)** sem uso de frameworks pesados, gerenciando o histórico e a navegação fluida através da **HTML5 History API** (`pushState` e `popstate`).
* Sistema de navegação responsivo com cálculo dinâmico de viewport (*Priority+ Navigation*), adaptando os menus para telas mobile e desktop.

### 2. Autenticação e Gestão de Sessões
* Sistema completo de cadastro e login com validação de dados em tempo real no cliente e no servidor.
* Proteção contra **SQL Injection** em consultas críticas utilizando *Prepared Statements*.
* Mecanismo de persistência de login (*"Lembrar de Mim"*) com geração e validação de tokens criptográficos via cookies seguros.

### 3. CMS e Modelagem Relacional Flexível
* Painel administrativo que permite a criação e cadastro de novas aplicações dinamicamente via formulário, sem necessidade de editar o código-fonte da aplicação principal.
* Modelagem de banco relacional estruturada para desacoplar as aplicações dos usuários: cada perfil possui um registro individualizado de estado, progresso e score para cada projeto cadastrado.
