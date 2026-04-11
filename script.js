const verificarUsuariosCadastrados = localStorage.getItem("usuarios");

const cadastrarUsuario = () => {
    const novoUsuario = document.querySelector("#usuario-cadastro").value.trim();
    const novaSenha = document.querySelector("#senha-cadastro").value.trim();
    const confirmarSenha = document.querySelector("#confirmar-senha-cadastro").value.trim();
    
    if (novoUsuario && novaSenha && confirmarSenha) {
        if (novaSenha === confirmarSenha) {            
            if (!verificarUsuariosCadastrados) {
                const lista = [];
                lista.push({"usuario": novoUsuario, "senha": novaSenha});
                localStorage.setItem("usuarios", JSON.stringify(lista));
                return [];
            } else {
                const pegarLista = JSON.parse(verificarUsuariosCadastrados);
                pegarLista.push({"usuario": novoUsuario, "senha": novaSenha});
                localStorage.setItem("usuarios", JSON.stringify(pegarLista));
            }
        } else {
            alert("As senhas não conferem");
        }
    } else {
        alert("por favor, preencha todos os campos");
    }
}

const botaoCadastrar = document.querySelector("#botao-cadastrar");
botaoCadastrar.addEventListener("click", cadastrarUsuario);

const validarUsuario = () => {
    // const usuario = document.querySelector("#usuario-login").value;
    // const senha = document.querySelector("#senha-login").value

    // console.log(verificarUsuariosCadastrados);

    alert("hello world");
}

const botaoLogin = document.querySelector("#botao-login");
botaoLogin.addEventListener("click", validarUsuario);