Passo C — A primeira linha que “fala” com o localStorage (ler antes de gravar)
Para guardar vários usuários numa lista, o fluxo é:

Ler o texto que já está salvo (pode ser que ainda não exista nada).
Transformar esse texto em lista no JavaScript (ou começar com lista vazia).
Adicionar o novo cadastro na lista.
Gravar a lista inteira de novo como texto.
A primeira linha desse bloco costuma ser:

const textoSalvo = localStorage.getItem("usuarios");

(ou o nome da constante CHAVE_USUARIOS que você criou — é só um apelido para a string "usuarios").

Onde escrever: dentro da função cadastrarUsuario, depois das validações (campos preenchidos e senhas iguais), antes de dar push e setItem.

Passo D — Virar lista, conferir duplicado, empurrar, salvar
Em sequência dentro da mesma função, depois do getItem:

Se tinha texto → JSON.parse(textoSalvo) vira lista; se não → [].
Opcional: se já existe esse usuário → alert e return.
lista.push({ usuario: ..., senha: ... }).
localStorage.setItem("usuarios", JSON.stringify(lista)).
A última linha (setItem com stringify) é o que realmente grava tudo de novo na “gaveta”.

4. Resumo visual da ordem
Página carrega
    → script.js roda de cima pra baixo
        → “acha o botão” + “no clique, chama cadastrarUsuario”
Usuário clica em Cadastrar
    → cadastrarUsuario roda
        → lê os campos
        → valida
        → getItem (ler)
        → parse ou []
        → checar duplicado (opcional)
        → push
        → setItem + stringify (gravar)
5. Por onde começar na prática (uma frase)
Abra o script.js e comece pelo Passo A (botão + click → função). Dentro da função, primeiro ler e validar os campos; só então cole o bloco do getItem / parse / push / setItem.

6. Como saber se funcionou
Abra a página de cadastro, cadastre alguém, abra as ferramentas do desenvolvedor → Application (ou Armazenamento) → Local Storage → veja se aparece a chave usuarios com um valor que parece [{...}].

Se quiser, no próximo passo você cola aqui o seu script.js inteiro (ou diz “tenho só X linhas”) e eu te digo em qual linha exata encaixar cada parte — ainda só explicando, sem editar o arquivo por você (modo Ask).