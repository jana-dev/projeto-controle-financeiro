var size = screen.width;
var transacao = [];
var total = 0;

desenhaTabela();

/*Função para abrir e fechar o menu mobile*/
function fecharMenu() {
  document.getElementById("menu-conteiner").style.display = "none";
}
function abrirMenu() {
  document.getElementById("menu-conteiner").style.display = "block";
}

/* Mascara de moeda para o input valor do formulário */
$(document).ready(function () {
  $("#valor").maskMoney({
    prefix: "R$ ",
    allowNegative: true,
    thousands: ".",
    decimal: ",",
    affixesStay: true,
  });
});

/* Validação do campo valor*/
function validarValor(e) {
  e.preventDefault();
  var validacao = document.getElementById("valor").value;
  if (validacao == "") {
    alert("Digite um valor");
  }
}

// Armazena no LocalStorage
function cadastrar(e) {
  e.preventDefault();
  console.log("clicou no adicionar transacao");

  var tipo = document.getElementById("transacao").value;
  var nome = document.getElementById("nomeMercadoria").value;
  var valor = document.getElementById("valor").value;

  var transacao = JSON.parse(localStorage.getItem("transacao") || "[]");

  transacao.push({
    tipo: tipo,
    nome: nome,
    valor: valor,
  });

  localStorage.setItem("transacao", JSON.stringify(transacao));
  desenhaTabela();
}

// Desenha as linhas das transações na tabela pegando a chave do localStorage
function desenhaTabela() {
  transacao = JSON.parse(localStorage.getItem("transacao"));
  if (transacao != null) {
    document.querySelector("#dinamico").innerHTML = transacao
      .map((item) => {
        return `<tr class="conteudo-dinamico">
        <td class="espaco-simbolo">
        ${item.tipo == "venda" ? "+" : "-"}
        </td>
        <td class="conteudo-tabela alinhamento-esquerdo">
          ${item.nome}
        </td>
        <td class="alinhamento-direito">
          ${item.valor}
        </td>
      </tr>
      <tr class="linha-simples-separadora conteudo-dinamico"> 
        <td colspan="3"></td>
      </tr>`;
      })
      .join("");
    listarTotal();
    if (transacao != null) {
      document.getElementById("espaco-linhadupla").style.display = "none";
      document.getElementById("nenhumaCadastrada").style.display = "none";
    }
  }
}

// função para deletar todas as transações do localstorage
function deletarTransacoes() {
  confirmar = confirm(
    "Tem certeza que deseja excluir todos os registros armazenados?"
  );
  if (confirmar == true) {
    localStorage.clear("transacao");
    alert("Registros excluídos");
    location.reload();
  } else {
    alert("Registros mantidos");
  }
  desenhaTabela();
}

// função que realiza o cálculo dos valores inseridos no form

function calculoValores() {
  let transacao = JSON.parse(localStorage.getItem("transacao"));
  let totalStrVenda = [];
  let totalStrCompra = [];
  let totalNbrVenda = [];
  let totalNbrCompra = [];
  let totalVenda = 0;
  let totalCompra = 0;
  let i = 0;
  let j = 0;
  if (transacao != null) {
    for (; i < transacao.length; i++) {
      if (transacao[i].tipo == "compra") {
        totalStrCompra = [transacao[i].valor.replace(/\D/g, "")];
        totalNbrCompra = Number.parseFloat(totalStrCompra);
        totalCompra += totalNbrCompra;
      }
    }
    for (; j < transacao.length; j++) {
      if (transacao[j].tipo == "venda") {
        totalStrVenda = [transacao[j].valor.replace(/\D/g, "")];
        totalNbrVenda = Number.parseFloat(totalStrVenda);
        totalVenda += totalNbrVenda;
      }
    }
    total = totalVenda - totalCompra;
  }
}

/*Função que lista na tela se o valor apresentado é de lucro ou de prejuízo, baseado no valor da variável 'total'*/
function listarTotal() {
  calculoValores();
  formatarMoeda();
  var campoTotal = document.getElementById("resultTotal");
  resultTotal.innerHTML = "R$ " + totalFormatado;

  if (total > 0) {
    lucro.innerHTML = "[LUCRO]";
  } else if (total < 0) {
    lucro.innerHTML = "[PREJUIZO]";
  } else {
    lucro.innerHTML = "";
  }
}

function formatarMoeda() {
  totalFormatado = total;
  totalFormatado = totalFormatado + "";
  totalFormatado = parseInt(totalFormatado.replace(/[\D]+/g, ""));
  totalFormatado = totalFormatado + "";
  totalFormatado = totalFormatado.replace(/([0-9]{2})$/g, ",$1");

  if (totalFormatado.length > 6) {
    totalFormatado = totalFormatado.replace(
      /([0-9]{3}),([0-9]{2}$)/g,
      ".$1,$2"
    );
  }
}
