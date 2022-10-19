var extrairCamposDoFormulario = function (formulario) {
    var loginInput = formulario[0], senhaInput = formulario[1], confirmacaoSenhaInput = formulario[2];
    var login = loginInput.value;
    var senha = senhaInput.value;
    var confirmacaoSenha = confirmacaoSenhaInput.value;
    return { login: login, senha: senha, confirmacaoSenha: confirmacaoSenha };
};
var verificarSeUsuarioJaExiste = function (login) {
    var _a;
    var usuarios = JSON.parse((_a = localStorage.getItem("usuarios")) !== null && _a !== void 0 ? _a : "[]");
    return usuarios === null || usuarios === void 0 ? void 0 : usuarios.find(function (u) { return u.login === login; });
};
var verificaSeSenhaEvalida = function (senha) {
    var tamanhoSenha = senha.length;
    return tamanhoSenha >= 6;
};
var verificarSeSenhasSaoIguais = function (senha, confirmacaoSenha) { return senha === confirmacaoSenha; };
var formularioRegistro = document.getElementById("form");
formularioRegistro.addEventListener("submit", function (e) {
    var _a;
    e.preventDefault();
    var _b = extrairCamposDoFormulario(e.target), login = _b.login, senha = _b.senha, confirmacaoSenha = _b.confirmacaoSenha;
    var senhasSaoIguais = verificarSeSenhasSaoIguais(senha, confirmacaoSenha);
    if (!senhasSaoIguais) {
        alert("As senha deve ser igual à confirmação de senha!");
    }
    else if (verificarSeUsuarioJaExiste(login)) {
        alert("Já existe um usuário com esse login!");
    }
    else if (!verificaSeSenhaEvalida(senha)) {
        alert("A senha deve ter pelo menos 6 caracteres!");
    }
    else {
        var usuarios = JSON.parse((_a = localStorage.getItem("usuarios")) !== null && _a !== void 0 ? _a : "[]");
        var novoUsuario = { login: login, senha: senha };
        if (!usuarios) {
            localStorage.setItem("usuarios", JSON.stringify([novoUsuario]));
        }
        else {
            usuarios.push(novoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }
        alert("Usuário criado com sucesso!");
        window.location.href = "paginaInicial.html";
    }
});
