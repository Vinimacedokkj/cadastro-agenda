const STORAGE_USUARIOS = "usuarios";
const CHAVE_SESSAO = "sessao_ativa";

const obterListaUsuarios = () => {
    const verificarLista = localStorage.getItem(STORAGE_USUARIOS);
    if (!verificarLista) {
        return [];
    }   
    try {
        const lista = JSON.parse(verificarLista);
        return Array.isArray(lista) ? lista : [];
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
    const novoUsuario = document.querySelector("#usuario-cadastro").value.trim();
    const novaSenha = document.querySelector("#senha-cadastro").value.trim();
    const confirmarSenha = document.querySelector("#confirmar-senha-cadastro").value.trim();

    if (novoUsuario && novaSenha && confirmarSenha) {
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
    const usuarioLogin = document.querySelector("#usuario-login").value.trim();
    const senhaLogin = document.querySelector("#senha-login").value;

    const lista = obterListaUsuarios();
    if (lista.length === 0) {
        alert("Nenhum usuário cadastrado.");
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
    const u = document.querySelector("#usuario-login");
    const s = document.querySelector("#senha-login");
    if (u) {
        u.value = "";
        u.style.border = "";
    }
    if (s) {
        s.value = "";
        s.style.border = "";
    }
};

const criarCadastro = () => {
    
}

document.addEventListener("DOMContentLoaded", aplicarEstadoLoginNaPagina);
