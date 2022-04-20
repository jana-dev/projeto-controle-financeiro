
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










