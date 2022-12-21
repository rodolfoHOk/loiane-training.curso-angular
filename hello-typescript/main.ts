// Variáveis
var minhaVar = "minha variável";

function minhaFunc(x, y) {
  return x + y;
}

// ES 6 ou ES 2015
let num = 2;
const PI = 3.14;

// Função
var numeros = [1, 2, 3];
numeros.map(function (valor) {
  return valor * 2;
});
numeros.map((valor) => valor * 2); // ES 2015

// Classe
class Matematica {
  soma(x, y) {
    return x + y;
  }
}

// Tipos
var n1: any = "asdf";
n1 = 4;
