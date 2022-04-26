
/*Função para abrir e fechar o menu mobile*/
var size = screen.width;
function fecharMenu() {
  document.getElementById("menu-conteiner").style.display = "none";
}
function abrirMenu() {
  document.getElementById("menu-conteiner").style.display = "block";
}


/* Mascara de moeda para o input valor do formulário */
$(document).ready(function (){
  $('#valor').maskMoney({
    prefix:'R$ ',
    allowNegative: true,
    thousands:'.', decimal:',',
    affixesStay:true});
    
});

/* Validação do campo valor*/
function validarValor(){
  var validacao = document.getElementById('valor').value;
  if(validacao == ""){
    alert("Digite um valor");
  } 
}

// função para armazenar o conteudo do extrato dinamicamente na tabela, ainda em andamento

function desenhaTabela(){

  var extrato = [
    {
      tipo: 'Compra',
      nome: 'Bicicleta',
      valor: 'R$ 2.500,00'
    },
    {
      tipo: 'Compra',
      nome: 'Moto',
      valor: 'R$ 30.000,00'
    },
    {
      tipo: 'Venda',
      nome: 'Cama',
      valor: 'R$ 1.500,00'
    }
  ];


  for (transacao in extrato){
      document.querySelector('table.tabela tbody').innerHTML += 
        `<tr class="conteudo-dinamico">
        <td class="espaco-simbolo">
        ${extrato[transacao].tipo ? '+' : '-'}
        </td>
        <td class="conteudo-tabela alinhamento-esquerdo">
          ${extrato[transacao].nome}
        </td>
        <td class="alinhamento-direito">
          ${extrato[transacao].valor}
        </td>
      </tr>
      <tr class="linha-simples-separadora conteudo-dinamico"> <!--linha apenas para desenhar uma borda-->
        <td colspan="3"></td>
      </tr>`
      
  }

}

desenhaTabela();



















