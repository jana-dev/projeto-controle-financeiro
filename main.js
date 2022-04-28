/*Função para abrir e fechar o menu mobile*/
var size = screen.width;
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
function validarValor() {
  var validacao = document.getElementById("valor").value;
  if (validacao == "") {
    alert("Digite um valor");
  }
}

// Armazenar no LocalStorage

var transacao = [];
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
  console.log({ transacao });
  desenhaTabela();
}

function desenhaTabela() {

  transacao = JSON.parse(localStorage.getItem('transacao'));
  if(transacao != null){
    document.querySelector("#dinamico").innerHTML = transacao.map((item) => {
      return(
        `<tr class="conteudo-dinamico">
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
      </tr>`
      )
    }).join('')
  }

}

desenhaTabela()

