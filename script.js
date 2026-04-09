const cadastrarUsuario = () => {

    const validarInformacoesVazias = () => {
        const novoUsuario = document.querySelector("#usuario").value.trim();
        const novaSenha = document.querySelector("#senha-cadastro").value.trim();
        const confirmarSenha = document.querySelector("#confirmar-senha-cadastro").value.trim();
        
        if (novoUsuario && novaSenha && confirmarSenha) {
            if (novaSenha === confirmarSenha) {
                alert(`Bem vindo, ${novoUsuario}`);

            } else {
                alert("As senhas não conferem");
            }
        } else {
            alert("por favor, preencha todos os campos");
        }
    }

    validarInformacoesVazias();
}

const botaoCadastrar = document.querySelector("#botao-cadastrar");
botaoCadastrar.addEventListener("click", cadastrarUsuario);
