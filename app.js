// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjetas1 = null;
let tarjetas2 = null;
let primerResultado = null;
let segundoResultado = null;
let temporizador = false;
let movimientos = 0;
let puntos = 0;
let tiempoInicial = 30;
let tiempo = 30;
let regresivo = null;

const mostrarT = document.getElementById("tiempo");
const puntaje = document.getElementById("puntos");
const movimientosDoc = document.getElementById("movimientos");

// Array aleatorio
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function mezclarCartas() {
  numeros = numeros.sort(() => Math.random() - 0.5);
}

function contarTiempo() {
  regresivo = setInterval(() => {
    tiempo--;
    mostrarT.innerHTML = `Tiempo: <br/> ${tiempo} segundos`;
    if (tiempo == 0) {
      clearInterval(regresivo);
      bloquearTarjetas();
      puntaje.innerHTML = `Puntos: ${puntos} 😱`;
      mostrarT.innerHTML = `Tiempo: ${tiempo} segundos. Perdiste 😔`;
      movimientosDoc.innerHTML = `Movimientos: ${movimientos} 😳`;
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i < 16; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./assets/images/${numeros[i]}.png">`;
    tarjetaBloqueada.disabled = true;
  }
}

function look(id) {
  tarjetasDestapadas++;

  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  if (tarjetasDestapadas == 1) {
    tarjetas1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjetas1.innerHTML = `<img src="./assets/images/${primerResultado}.png">`;
    // Deshabilitar para no poder volver a hacer click
    tarjetas1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    tarjetas2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjetas2.innerHTML = `<img src="./assets/images/${segundoResultado}.png">`;
    // Deshabilitar para no poder volver a hacer click
    tarjetas2.disabled = true;
    // Cada dos tarjetas destapadas = 1 movimiento
    movimientos++;
    movimientosDoc.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado === segundoResultado) {
      puntos++;
      puntaje.innerHTML = `Puntos: ${puntos}`;
      if (puntos == 8) {
        clearInterval(regresivo);
        puntaje.innerHTML = `¡Felicidades! 🎊🎉🤩`;
        mostrarT.innerHTML = `¡Fantástico! 🎉 Sólo demoraste ${
          tiempoInicial - tiempo
        } segundos`;
        movimientos.innerHTML = `${movimientos} 😎`;
      }
      tarjetasDestapadas = 0;
    } else {
      setTimeout(() => {
        tarjetas1.innerHTML = "";
        tarjetas2.innerHTML = "";
        tarjetas1.disabled = false;
        tarjetas2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }
}
// Función para reiniciar el juego
function reiniciarJuego() {
  tarjetasDestapadas = 0;
  temporizador = false;
  movimientos = 0;
  puntos = 0;
  tiempo = tiempoInicial;
  clearInterval(regresivo);

  // Reiniciar el DOM
  mostrarT.innerHTML = `Tiempo: ${tiempoInicial} segundos`;
  puntaje.innerHTML = `Puntos: 0`;
  movimientosDoc.innerHTML = `Movimientos: 0`;

  // Volver a habilitar las tarjetas y limpiarlas
  for (let i = 0; i < 16; i++) {
    let tarjeta = document.getElementById(i);
    tarjeta.innerHTML = "";
    tarjeta.disabled = false;
  }

  mezclarCartas();
}

const jugar = document.getElementById("jugar");
jugar.addEventListener("click", reiniciarJuego);

window.onload = function () {
  mezclarCartas();
};
