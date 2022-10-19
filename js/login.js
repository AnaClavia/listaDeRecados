var verificarSeLoginExiste = function (login) {
    var _a;
    var usuarios = JSON.parse((_a = localStorage.getItem("usuarios")) !== null && _a !== void 0 ? _a : "[]");
    var loginExiste = usuarios === null || usuarios === void 0 ? void 0 : usuarios.find(function (u) { return u.login === login; });
    if (!loginExiste) {
        return false;
    }
    else {
        return true;
    }
};
var verificarSeSenhaDaContaEstaCorreta = function (login, senha) {
    var _a;
    var usuarios = JSON.parse((_a = localStorage.getItem("usuarios")) !== null && _a !== void 0 ? _a : "[]");
    var usuario = usuarios.find(function (u) { return u.login === login; });
    return usuario.senha === senha;
};
var fazerLogin = function (login, senha) {
    var loginExiste = verificarSeLoginExiste(login);
    if (!loginExiste) {
        alert("Login não existe!");
    }
    else {
        var senhaEstaCorreta = verificarSeSenhaDaContaEstaCorreta(login, senha);
        if (!senhaEstaCorreta) {
            alert("Senha incorreta!");
        }
        else {
            localStorage.setItem("session", login);
            window.location.href = "meusRecados.html";
        }
    }
};
var extrairLoginEsenhaDoFormulario = function (formulario) {
    var loginInput = formulario[0], senhaInput = formulario[1];
    var login = loginInput.value;
    var senha = senhaInput.value;
    return { login: login, senha: senha };
};
var formulario = document.getElementById("form");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    var _a = extrairLoginEsenhaDoFormulario(e.target), login = _a.login, senha = _a.senha;
    fazerLogin(login, senha);
});
