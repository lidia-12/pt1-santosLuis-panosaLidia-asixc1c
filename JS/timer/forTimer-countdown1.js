// Seleccionar elementos del DOM
const horasInput = document.getElementById('hours');
const minutosInput = document.getElementById('minutes');
const segundosInput = document.getElementById('seconds');
const startButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const restartButton = document.getElementById('restart');
const countdownDiv = document.getElementById('countdown');
const currentDateTimeDiv = document.getElementById('currentDateTime');
const audioPlayer = document.getElementById('audioPlayer');

let countdownInterval; // variable global para el intervalo del temporizador
let countdownTime = 0; // variable global para el tiempo restante del temporizador en segundos
let isPaused = false; // variable global para indicar si el temporizador está pausado

// Función para iniciar el temporizador
function startCountdown() {
  // Obtener los valores de entrada de horas, minutos y segundos
  const horas = parseInt(horasInput.value);
  const minutos = parseInt(minutosInput.value);
  const segundos = parseInt(segundosInput.value);

  // Convertir las horas, minutos y segundos a segundos
  countdownTime = horas * 3600 + minutos * 60 + segundos;

  // Deshabilitar los campos de entrada mientras se ejecuta el temporizador
  horasInput.disabled = true;
  minutosInput.disabled = true;
  segundosInput.disabled = true;

  // Ocultar el botón "PLAY" y mostrar los botones "PAUSE" y "RESTART"
  startButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';
  restartButton.style.display = 'inline-block';

// Mostrar la hora y fecha actual
const currentDateTime = new Date();
currentDateTimeDiv.innerHTML = 'Fecha y hora actuales:' ${currentDateTime.toLocaleString()};

// Crear el intervalo del temporizador
countdownInterval = setInterval(() => {
// Verificar si el temporizador está pausado
if (!isPaused) {
// Restar un segundo al tiempo restante
countdownTime--; // Verificar si el tiempo restante ha llegado a cero
  if (countdownTime <= 0) {
    // Detener el intervalo del temporizador
    clearInterval(countdownInterval);

    // Mostrar el mensaje de finalización del temporizador
    countdownDiv.innerHTML = '¡Tiempo finalizado!';

    // Reproducir la música seleccionada
    const selectedMusic = document.getElementById('musica').value;
    audioPlayer.src = selectedMusic;
    audioPlayer.play();
  } else {
    // Calcular las horas, minutos y segundos restantes
    let horasRestantes = Math.floor(countdownTime / 3600);
    let minutosRestantes = Math.floor((countdownTime % 3600) / 60);
    let segundosRestantes = countdownTime % 60;

    // Crear una cadena con el tiempo restante en formato hh:mm:ss
    let tiempoRestante = `${horasRestantes.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;

    // Mostrar el tiempo restante en el elemento de la cuenta regresiva
    countdownDiv.innerHTML = `Tiempo restante: ${tiempoRestante}`;
  }
}}, 1000);
}

// Función para pausar el temporizador
function pauseCountdown() {
// Cambiar el estado de la variable isPaused
isPaused = !isPaused;

// Cambiar el texto del botón de pausa según si el temporizador está pausado o no
pauseButton.innerHTML = isPaused ? 'RESUME' : 'PAUSE';
}

// Función para reiniciar el temporizador
function restartCountdown() {
// Detener el intervalo del temporizador
clearInterval(countdownInterval);

// Restablecer el tiempo restante del temporizador
countdownTime = 0;

// Habilitar los campos de entrada
horasInput.disabled = false;
minutosInput.disabled = false;
segundosInput.disabled = false;

// Mostrar el botón "PLAY" y ocultar los botones "PAUSE" y "RESTART"
startButton.style.display = 'inline-block';
pauseButton.style.display = 'none';
restartButton.style.display = 'none';

// Reiniciar el mensaje de cuenta regresiva
countdownDiv.innerHTML = '';
}

// Asignar los manejadores de eventos a los botones
startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
restartButton.addEventListener('click', restartCountdown);