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
    const usuarioLogin = document.querySelector("#usuario-login").value;
    const senhaLogin = document.querySelector("#senha-login").value

    const usuariosCadastrados = verificarUsuariosCadastrados;
    JSON.parse(usuariosCadastrados);

    usuariosCadastrados.filter((usuario) => usuario.nome === usuarioLogin && usuario.senha === senhaLogin);

    console.log(usuariosCadastrados);
    

}