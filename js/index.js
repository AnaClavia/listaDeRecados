var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var editarRecadoNaTabela = function (recadoIndex, novoRecado) {
    var recado = document.getElementById(recadoIndex.toString());
    var _a = recado === null || recado === void 0 ? void 0 : recado.childNodes, index = _a[0], descricao = _a[1], detalhamento = _a[2];
    descricao.innerHTML = novoRecado.descricao;
    detalhamento.innerHTML = novoRecado.detalhamento;
};
var editarRecado = function (linha) {
    var recadoIndex = parseInt(linha.id) - 1;
    var descricao = String(prompt("Digite a nova descrição"));
    var detalhamento = String(prompt("Digite o novo detalhamento"));
    var _a = obterListadeUsuariosEindiceDoUsuarioLogado(), usuarios = _a.usuarios, usuarioIndex = _a.usuarioIndex;
    usuarios[usuarioIndex].recados[recadoIndex] = { descricao: descricao, detalhamento: detalhamento };
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    editarRecadoNaTabela(recadoIndex + 1, { descricao: descricao, detalhamento: detalhamento });
};
var apagarRecado = function (linha) {
    var recadoIndex = parseInt(linha.id) - 1;
    var recados = obterRecadosDoUsuario();
    recados.splice(recadoIndex, 1);
    var _a = obterListadeUsuariosEindiceDoUsuarioLogado(), usuarios = _a.usuarios, usuarioIndex = _a.usuarioIndex;
    usuarios[usuarioIndex].recados = recados;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    linha.remove();
    atualizarIndicesDaTabela();
};
var atualizarIndicesDaTabela = function () {
    var linhas = Array.from(document.getElementsByClassName("tabela_linha"));
    linhas.forEach(function (linha, index) {
        linha.setAttribute("id", (index + 1).toString());
        linha.cells[0].innerHTML = (index + 1).toString();
    });
};
var obterListadeUsuariosEindiceDoUsuarioLogado = function () {
    var _a;
    var emailDoUsuarioLogado = localStorage.getItem("session");
    var usuarios = JSON.parse((_a = localStorage.getItem("usuarios")) !== null && _a !== void 0 ? _a : "[]");
    var usuarioIndex = usuarios === null || usuarios === void 0 ? void 0 : usuarios.findIndex(function (usuario) { return usuario.login === emailDoUsuarioLogado; });
    return { usuarios: usuarios, usuarioIndex: usuarioIndex };
};
var obterRecadosDoUsuario = function () {
    var _a;
    var emailDoUsuarioLogado = localStorage.getItem("session");
    var usuarios = JSON.parse((_a = localStorage.getItem("usuarios")) !== null && _a !== void 0 ? _a : "[]");
    var usuarioLogado = usuarios === null || usuarios === void 0 ? void 0 : usuarios.find(function (u) { return u.login === emailDoUsuarioLogado; });
    return usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.recados;
};
var salvarRecadoDoUsuario = function (recado) {
    var _a;
    var _b = obterListadeUsuariosEindiceDoUsuarioLogado(), usuarios = _b.usuarios, usuarioIndex = _b.usuarioIndex;
    if (!((_a = usuarios[usuarioIndex]) === null || _a === void 0 ? void 0 : _a.recados)) {
        usuarios[usuarioIndex] = __assign(__assign({}, usuarios[usuarioIndex]), { recados: [__assign({}, recado)] });
    }
    else {
        usuarios[usuarioIndex].recados.push(recado);
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};
var criarCelulaDaTabela = function (nomeAtributo, valorAtributo, innerHTML) {
    var td = document.createElement("td");
    td.setAttribute(nomeAtributo, valorAtributo);
    if (innerHTML) {
        td.innerHTML = innerHTML;
    }
    return td;
};
var criarBotao = function (id, onclick, innerHTML) {
    var btnApagar = document.createElement("button");
    btnApagar.setAttribute("id", id);
    btnApagar.setAttribute("onclick", onclick);
    btnApagar.innerHTML = innerHTML;
    return btnApagar;
};
var criarLinhaDaTabela = function (celulas, id, classe) {
    var tr = document.createElement("tr");
    celulas.forEach(function (celula) {
        tr.appendChild(celula);
    });
    tr.setAttribute("id", id);
    tr.setAttribute("class", classe);
    return tr;
};
var adicionarRecadoNaTabela = function (recado, index) {
    var tabela = document.getElementById("tabela_corpo");
    var tdNum = criarCelulaDaTabela("id", "tabela_ordem", (index + 1).toString());
    var tdDescricao = criarCelulaDaTabela("id", "tabela_descricao", recado.descricao);
    var tdDetalhamento = criarCelulaDaTabela("id", "tabela_detalhamento", recado.detalhamento);
    var tdAcao = criarCelulaDaTabela("id", "tabela_acao");
    var btnApagar = criarBotao("apagar", "apagarRecado(this.parentElement.parentElement)", "Apagar");
    var btnEditar = criarBotao("editar", "editarRecado(this.parentElement.parentElement)", "Editar");
    tdAcao.appendChild(btnApagar);
    tdAcao.appendChild(btnEditar);
    var tr = criarLinhaDaTabela([tdNum, tdDescricao, tdDetalhamento, tdAcao], (index + 1).toString(), "tabela_linha");
    tabela.appendChild(tr);
};
var getInputValue = function (inputId) { return document.getElementById(inputId).value; };
var setInputValue = function (inputId, inputValue) {
    document.getElementById(inputId).value = inputValue;
};
var limparCampos = function () {
    setInputValue("descricao", "");
    setInputValue("detalhamento", "");
};
var salvarRecado = function () {
    var _a;
    var descricao = getInputValue("descricao");
    var detalhamento = getInputValue("detalhamento");
    var recados = obterRecadosDoUsuario();
    var id = (_a = recados === null || recados === void 0 ? void 0 : recados.length) !== null && _a !== void 0 ? _a : 0;
    var novoRecado = { descricao: descricao, detalhamento: detalhamento };
    salvarRecadoDoUsuario(novoRecado);
    adicionarRecadoNaTabela(novoRecado, id);
    limparCampos();
};
var verificaSeUsuarioEstaLogado = function () {
    var emailDoUsuarioLogado = localStorage.getItem("session");
    if (emailDoUsuarioLogado) {
        return true;
    }
    else {
        return false;
    }
};
var logout = function () {
    localStorage.removeItem("session");
    window.location.href = "paginaInicial.html";
};
window.addEventListener('DOMContentLoaded', function () {
    var usuarioEstaLogado = verificaSeUsuarioEstaLogado();
    if (usuarioEstaLogado) {
        var body = document.getElementById("invisivel");
        body === null || body === void 0 ? void 0 : body.setAttribute("id", "container");
        var meusRecados = obterRecadosDoUsuario();
        meusRecados === null || meusRecados === void 0 ? void 0 : meusRecados.forEach(function (recado, index) {
            adicionarRecadoNaTabela(recado, index);
        });
    }
    else {
        window.location.href = "paginaInicial.html";
    }
});
