var extrairCamposDoFormularioRecuperacao = function (formulario) {
    var loginInput = formulario[0], senhaInput = formulario[1], confirmacaoSenhaInput = formulario[2];
    var login = loginInput.value;
    var senha = senhaInput.value;
    var confirmacaoSenha = confirmacaoSenhaInput.value;
    return { login: login, senha: senha, confirmacaoSenha: confirmacaoSenha };
};
var formularioRecuperacao = document.getElementById("form");
formularioRecuperacao.addEventListener("submit", function (e) {
    var _a;
    e.preventDefault();
    console.log(e.target);
    var _b = extrairCamposDoFormularioRecuperacao(e.target), login = _b.login, senha = _b.senha, confirmacaoSenha = _b.confirmacaoSenha;
    var usuarios = JSON.parse((_a = localStorage.getItem("usuarios")) !== null && _a !== void 0 ? _a : "[]");
    var usuarioIndex = usuarios.findIndex(function (usuario) { return usuario.login === login; });
    if (usuarioIndex === -1) {
        alert("Não existe um usuário com esse login!");
    }
    else if (senha !== confirmacaoSenha) {
        alert("As senha deve ser igual à confirmação de senha!");
    }
    else if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres!");
    }
    else {
        usuarios[usuarioIndex].senha = senha;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Senha alterada com sucesso!");
        window.location.href = "paginaInicial.html";
    }
});
