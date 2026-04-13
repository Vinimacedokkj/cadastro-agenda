const STORAGE_USUARIOS = "usuarios";
const CHAVE_SESSAO = "sessao_ativa";
const LISTA_USUARIOS = "lista_usuarios_cadastrados";

const obterListaUsuarios = () => {
    const verificarLista = localStorage.getItem(STORAGE_USUARIOS);
    if (!verificarLista) {
        return [];
    }   
    try {
        const lista = JSON.parse(verificarLista);
        if (Array.isArray(lista)) {
            return lista;
        } else {
            return [];
        }

    } catch {
        return [];
    }
};

const iniciarSessao = (nomeUsuario) => {
    const sessao = {
        usuario: nomeUsuario,
        idSessao: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
        iniciadaEm: Date.now(),
    };
    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
};

const obterSessao = () => {
    const verificarLista = sessionStorage.getItem(CHAVE_SESSAO);
    if (!verificarLista) return null;
    try {
        return JSON.parse(verificarLista);
    } catch {
        return null;
    }
};

const obterUsuarioLogado = () => {
    const sessaoAtiva = obterSessao();
    if (sessaoAtiva === null) {
        return null;
    }
    const nomeUsuario = sessaoAtiva.usuario;
    if (typeof nomeUsuario !== "string" || nomeUsuario.length === 0) {
        return null;
    }
    return nomeUsuario;
};

const encerrarSessao = () => {
    sessionStorage.removeItem(CHAVE_SESSAO);
};

const chaveAgendaDoUsuario = (nomeUsuario) => `agenda_contatos_${nomeUsuario}`;

const paginaTemPlataformaAgenda = () => !!document.querySelector(".div-plataforma.modal");

const atualizarCabecalhoSessao = () => {
    const elementoNomeUsuario = document.querySelector("#nome-usuario-sessao");
    if (elementoNomeUsuario !== null) {
        const nomeUsuarioLogado = obterUsuarioLogado();
        if (nomeUsuarioLogado !== null) {
            elementoNomeUsuario.textContent = nomeUsuarioLogado;
        } else {
            elementoNomeUsuario.textContent = "";
        }
    }
};

const aplicarEstadoLoginNaPagina = () => {
    if (!paginaTemPlataformaAgenda()) return;
    const logado = !!obterSessao();
    document.body.classList.toggle("logado", logado);
    atualizarCabecalhoSessao();
};

const cadastrarUsuario = () => {
    const campoUsuarioCadastro = document.querySelector("#usuario-cadastro");
    const novoUsuario = campoUsuarioCadastro.value.trim();
    const novaSenha = document.querySelector("#senha-cadastro").value.trim();
    const confirmarSenha = document.querySelector("#confirmar-senha-cadastro").value.trim();

    if (novoUsuario && novaSenha && confirmarSenha) {
        if (!campoUsuarioCadastro.checkValidity()) {
            alert("Digite um e-mail válido.");
            campoUsuarioCadastro.focus();
            return;
        }

        if (novaSenha === confirmarSenha) {
            const lista = obterListaUsuarios();
            lista.push({ usuario: novoUsuario, senha: novaSenha });
            localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(lista));
            alert("Usuário cadastrado com sucesso");
            window.location.href = "login.html";
        } else {
            alert("As senhas não conferem");
        }
    } else {
        alert("por favor, preencha todos os campos");
    }
};

const validarUsuario = () => {
    const campoUsuarioLogin = document.querySelector("#usuario-login");
    const usuarioLogin = campoUsuarioLogin.value.trim();
    const senhaLogin = document.querySelector("#senha-login").value;

    if (!campoUsuarioLogin.checkValidity()) {
        alert("Digite um e-mail válido.");
        campoUsuarioLogin.focus();
        return;
    }

    const lista = obterListaUsuarios();
    if (lista.length === 0) {
        alert("Email não encontrado.");
        return;
    }

    const usuarioEncontrado = lista.find(
        (u) => u.usuario === usuarioLogin && u.senha === senhaLogin
    );

    if (usuarioEncontrado) {
        iniciarSessao(usuarioEncontrado.usuario);
        aplicarEstadoLoginNaPagina();
        alert("Login realizado com sucesso.");
    } else {
        alert("Usuário ou senha incorretos.");

        const usuarioIncorreto = document.querySelector("#usuario-login");
        usuarioIncorreto.style.border = "1px solid #a00c";

        const senhaIncorreta = document.querySelector("#senha-login");
        senhaIncorreta.style.border = "1px solid #a00c";
        senhaIncorreta.value = "";
    }
};

const sairDaConta = () => {
    encerrarSessao();
    document.body.classList.remove("logado");
    atualizarCabecalhoSessao();
    const campoUsuarioLogin = document.querySelector("#usuario-login");
    const campoSenhaLogin = document.querySelector("#senha-login");
    if (campoUsuarioLogin) {
        campoUsuarioLogin.value = "";
        campoUsuarioLogin.style.border = "";
    }
    if (campoSenhaLogin) {
        campoSenhaLogin.value = "";
        campoSenhaLogin.style.border = "";
    }
};

const obterListaCadastrosDoUsuario = () => {
    const nomeUsuarioLogado = obterUsuarioLogado();
    if (!nomeUsuarioLogado) {
        return [];
    }

    const chaveDaAgenda = chaveAgendaDoUsuario(nomeUsuarioLogado);
    const textoLista = localStorage.getItem(chaveDaAgenda);
    if (!textoLista) {
        return [];
    }

    try {
        const lista = JSON.parse(textoLista);
        if (Array.isArray(lista)) {
            return lista;
        }
        return [];
    } catch {
        return [];
    }
};

const salvarListaCadastrosDoUsuario = (listaCadastros) => {
    const nomeUsuarioLogado = obterUsuarioLogado();
    if (!nomeUsuarioLogado) {
        return;
    }
    const chaveDaAgenda = chaveAgendaDoUsuario(nomeUsuarioLogado);
    localStorage.setItem(chaveDaAgenda, JSON.stringify(listaCadastros));
};

const atualizarContadorCadastros = (quantidadeCadastros) => {
    const elementoContador = document.querySelector("#total-cadastrados-agenda");
    if (elementoContador) {
        elementoContador.textContent = String(quantidadeCadastros);
    }
};

const renderizarListaCadastros = () => {
    const listaVisual = document.querySelector(".lista-pessoas-cadastradas");
    if (!listaVisual) {
        return;
    }

    const listaCadastros = obterListaCadastrosDoUsuario();
    atualizarContadorCadastros(listaCadastros.length);

    if (listaCadastros.length === 0) {
        listaVisual.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
        return;
    }

    const linhasDaTabela = listaCadastros
        .map(
            (cadastro, indiceCadastro) => `
            <tr>
                <td>${cadastro.nome}</td>
                <td>${cadastro.email}</td>
                <td>${cadastro.telefone}</td>
                <td>
                    <button type="button" class="botao-remover-cadastro" onclick="removerCadastroDaLista(${indiceCadastro})" aria-label="Remover cadastro">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
        )
        .join("");

    listaVisual.innerHTML = `
        <table class="tabela-cadastros">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${linhasDaTabela}
            </tbody>
        </table>
    `;
};

const removerCadastroDaLista = (indiceCadastro) => {
    const listaCadastros = obterListaCadastrosDoUsuario();
    if (indiceCadastro < 0 || indiceCadastro >= listaCadastros.length) {
        return;
    }

    listaCadastros.splice(indiceCadastro, 1);
    salvarListaCadastrosDoUsuario(listaCadastros);
    renderizarListaCadastros();
};

const limparCamposCadastro = () => {
    const campoNome = document.querySelector("#cadastro-nome");
    const campoEmail = document.querySelector("#cadastro-email");
    const campoTelefone = document.querySelector("#cadastro-telefone");

    if (campoNome) campoNome.value = "";
    if (campoEmail) campoEmail.value = "";
    if (campoTelefone) campoTelefone.value = "";
};

const criarCadastroNaLista = () => {
    const campoNome = document.querySelector("#cadastro-nome");
    const campoEmail = document.querySelector("#cadastro-email");
    const campoTelefone = document.querySelector("#cadastro-telefone");

    if (!campoNome || !campoEmail || !campoTelefone) {
        return;
    }

    const cadastroNome = campoNome.value.trim();
    const cadastroEmail = campoEmail.value.trim();
    const cadastroTelefone = campoTelefone.value.trim();

    if (!cadastroNome || !cadastroEmail || !cadastroTelefone) {
        alert("Por favor, preencha as informações");
    } else if (!campoEmail.checkValidity()) {
        alert("Digite um e-mail válido.");
        campoEmail.focus();
    } else {
        const listaCadastros = obterListaCadastrosDoUsuario();
        const novoCadastro = {
            nome: cadastroNome,
            email: cadastroEmail,
            telefone: cadastroTelefone
        };

        listaCadastros.push(novoCadastro);
        salvarListaCadastrosDoUsuario(listaCadastros);
        limparCamposCadastro();
        renderizarListaCadastros();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    aplicarEstadoLoginNaPagina();
    if (paginaTemPlataformaAgenda()) {
        renderizarListaCadastros();
    }
});
