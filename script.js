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
                
                alert("Usuário cadastrado com sucesso");
                window.location.href = "login.html";

            }
        } else {
            alert("As senhas não conferem");
        }
    } else {
        alert("por favor, preencha todos os campos");
    }
}

const validarUsuario = () => {
    const usuarioLogin = document.querySelector("#usuario-login").value.trim();
    const senhaLogin = document.querySelector("#senha-login").value;

    if (!verificarUsuariosCadastrados) {
        alert("Nenhum usuário cadastrado.");
        return;
    }

    const lista = JSON.parse(verificarUsuariosCadastrados);
    const usuarioEncontrado = lista.find(
        (u) => u.usuario === usuarioLogin && u.senha === senhaLogin
    );

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso.");
        window.location.href = "plataforma.html";
    } else {
        alert("Usuário ou senha incorretos.");
        
        const usuarioIncorreto = document.querySelector("#usuario-login");
        usuarioIncorreto.style.border = "2px solid #a00c";
        
        const senhaIncorreta = document.querySelector("#senha-login");
        senhaIncorreta.style.border = "2px solid #a00c";
        senhaIncorreta.value = "";
    }
}